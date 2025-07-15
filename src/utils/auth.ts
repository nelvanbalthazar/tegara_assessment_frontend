// Get token from localStorage
export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

// Save token to localStorage
export function setAuthToken(token: string): void {
  localStorage.setItem('token', token);
}

// Remove token
export function clearAuthToken(): void {
  localStorage.removeItem('token');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

// (Optional) Decode JWT payload
export function parseJwt(token: string): any | null {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
