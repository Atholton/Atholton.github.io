import { fetchWithAuth } from '@/lib/fetchWithAuth';

export interface Student {
  id: number;
  name: string;
  grade: number;
  hcpss_email: string;
  account_email?: string;
  phone_num?: string;
  teacher: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  teacher_period2?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  temp_teacher?: string;
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  teacher: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  total_pages: number;
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getStudents(params: {
  page?: number;
  grade?: number;
  search?: string;
  teacher?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.grade) searchParams.set('grade', params.grade.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.teacher) searchParams.set('teacher', params.teacher.toString());

  const response = await fetchWithAuth(`${API_BASE}/students/?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json() as Promise<PaginatedResponse<Student>>;
}

export async function getStudent(email: string) {
  try {
    const response = await fetchWithAuth(`${API_BASE}/students/by-email/${encodeURIComponent(email)}/`);
    if (!response.ok) {
      console.error(`Failed to fetch student: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      student: data,
      announcements: [] // We'll fetch announcements separately
    };
  } catch (error) {
    console.error('Error in getStudent:', error);
    throw error;
  }
}

export async function getAnnouncements(page = 1) {
  try {
    const response = await fetchWithAuth(`${API_BASE}/announcements/?page=${page}`);
    if (!response.ok) {
      console.error(`Failed to fetch announcements: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<PaginatedResponse<Announcement>>;
  } catch (error) {
    console.error('Error in getAnnouncements:', error);
    throw error;
  }
}
