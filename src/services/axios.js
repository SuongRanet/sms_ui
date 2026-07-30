//-Path: "\vite\src\services\axios.js"
// import axios from "axios";
// import env from "../configs/env";

// const baseURL = env.apiUrl;

// const serverRest = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
import axios from "axios";
import env from "../configs/env";
import Cookies from "js-cookie";

const baseURL = env.apiUrl;
const serverRest = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

serverRest.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        // console.log("Current cookies:",Cookies);

        // console.log("Token:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default serverRest;
// serverRest.interceptors.request.use(
//   (config) => {
//     const token = env.apiTokenKey;
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
