// src/utils/auth.ts

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
}

export function getToken(): string | null {
  const token = localStorage.getItem('token');
  if (isTokenValid(token)) return token;
  localStorage.removeItem('token'); // Remove invalid/expired token
  return null;
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
