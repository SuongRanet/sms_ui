//-Path: "\vite\src\services\axios.js"
import axios from "axios";
import env from "../configs/env";

const baseURL = env.apiUrl;

const serverRest = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// serverRest.interceptors.request.use(
//   (config) => {
//     const token = env.apiTokenKey;
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default serverRest;
