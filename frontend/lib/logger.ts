import { NextRequest } from 'next/server';

export type LogLevel = 'info' | 'warn' | 'error';
export type LogCategory = 'auth' | 'security' | 'api' | 'system';

interface LogEvent {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: Record<string, any>;
  error?: Error;
  userId?: string;
  sessionId?: string;
  ip?: string;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLogEvent(event: LogEvent): string {
    return JSON.stringify({
      ...event,
      error: event.error ? {
        message: event.error.message,
        stack: event.error.stack,
      } : undefined,
    });
  }

  private async persistLog(event: LogEvent) {
    if (this.isDevelopment) {
      // Development: Console output with colors
      const colors = {
        info: '\x1b[36m', // cyan
        warn: '\x1b[33m', // yellow
        error: '\x1b[31m', // red
        reset: '\x1b[0m'
      };
      
      console.log(
        `${colors[event.level]}[${event.timestamp}] [${event.category}] ${event.message}${colors.reset}`,
        event.data || ''
      );

      if (event.error) {
        console.error(event.error);
      }
    } else {
      // Production: Send to logging service or write to file
      // TODO: Implement production logging (e.g., to CloudWatch, Datadog, etc.)
      // For now, we'll just use console.log
      console.log(this.formatLogEvent(event));
    }
  }

  async log(
    level: LogLevel,
    category: LogCategory,
    message: string,
    data?: Record<string, any>,
    error?: Error,
    context?: {
      userId?: string;
      sessionId?: string;
      ip?: string;
    }
  ) {
    const event: LogEvent = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      error,
      ...context
    };

    await this.persistLog(event);
  }

  // Convenience methods
  async info(category: LogCategory, message: string, data?: Record<string, any>, context?: any) {
    await this.log('info', category, message, data, undefined, context);
  }

  async warn(category: LogCategory, message: string, data?: Record<string, any>, error?: Error, context?: any) {
    await this.log('warn', category, message, data, error, context);
  }

  async error(category: LogCategory, message: string, error: Error, data?: Record<string, any>, context?: any) {
    await this.log('error', category, message, data, error, context);
  }

  // Auth-specific logging methods
  async logAuthAttempt(success: boolean, data: {
    email?: string;
    provider: string;
    reason?: string;
    ip?: string;
    userId?: string;
  }) {
    const level = success ? 'info' : 'warn';
    const message = success ? 'Authentication successful' : 'Authentication failed';
    
    await this.log(level, 'auth', message, {
      success,
      ...data
    });
  }

  async logSecurityEvent(eventType: string, data: Record<string, any>, context?: any) {
    await this.log('warn', 'security', `Security event: ${eventType}`, data, undefined, context);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Request context helper
export function getRequestContext(req: NextRequest) {
  return {
    ip: req.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req.headers.get('user-agent'),
    sessionId: req.cookies.get('next-auth.session-token')?.value,
  };
}