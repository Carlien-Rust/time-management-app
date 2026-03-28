import axios from 'axios';
import { getAuth } from 'firebase/auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = localStorage.getItem('authtoken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached to header successfully.");
    } else if (user) {

      const idToken = await user.getIdToken();
      
      console.log("Adding Token to Header...");
      config.headers.Authorization = `Bearer ${idToken}`;
    }
  } catch (error) {
    console.error("Failed to get Firebase token:", error);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;