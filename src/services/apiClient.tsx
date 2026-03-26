/*
base endpoint = header + authtoken + some validation (if token exists fine, if not exist problemo)
base_url = some url
*/
import axios from 'axios';
//import { getAuth } from 'firebase/auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add token to headers for every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authtoken'); // or your state mgmt
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// apiClient.interceptors.request.use(async (config) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (user) {
//     const token = await user.getIdToken(); // This refreshes the token if expired!
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;