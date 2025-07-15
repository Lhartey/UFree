import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent retry loop and don't retry if this was already the refresh request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/users/token/refresh/')
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');

      if (refresh) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/users/token/refresh/', {
            refresh,
          });

          const newAccess = res.data.access;
          localStorage.setItem('token', newAccess);

          // Retry original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return instance(originalRequest);
        } catch (refreshErr) {
          console.error('🔒 Refresh token invalid or expired:', refreshErr);
        }
      }

      if (
        error.response?.status === 401 &&
        (error.response.data?.detail === 'Token is blacklisted' ||
          error.response.data?.detail === 'Token is invalid or expired')
        ) {
          localStorage.clear();
          window.location.href = '/';
        }

      // Final fallback — clean up and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default instance;
