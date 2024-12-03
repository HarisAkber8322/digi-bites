import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default api;
// Optionally, add interceptors for handling errors or attaching tokens
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Example of attaching token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


