   import { getSession } from 'next-auth/react';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const session = await getSession();

    // Get CSRF token from cookie
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(session?.idToken && { 'Authorization': `Bearer ${session.idToken}` }),
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
      ...options.headers,
    };

    console.log('Making request to:', url, { headers });

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }

      console.error('Response error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData
      });

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
