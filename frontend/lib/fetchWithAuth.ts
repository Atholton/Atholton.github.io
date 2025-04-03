const isClient = typeof window !== 'undefined';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Get the token from localStorage only in client-side
  const token = isClient ? localStorage.getItem('authToken') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      // Add credentials to handle cookies if needed
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
