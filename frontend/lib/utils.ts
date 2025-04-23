import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextRequest } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return `${date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  })}, ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })}`
}

export function getRequestIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return xff?.split(',')[0] || realIp || 'unknown'
}