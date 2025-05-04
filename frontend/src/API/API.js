import axios from 'axios';
import { store, persistor } from '../Store/store';
import { signOutSuccess } from '../Store/User/userSlice';

const API = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const { data } = await API.post('/user/refresh-token');
    if (data  ) {
      return data.data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } else {
        store.dispatch(signOutSuccess());
        await persistor.purge(); // Clear redux-persist
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(err);
  }
);

export { API };
