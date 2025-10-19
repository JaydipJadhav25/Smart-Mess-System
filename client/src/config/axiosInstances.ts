import axios from "axios"



export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. "http://localhost:5000"
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Try to send cookies automatically
});

// 🔒 Add request interceptor to attach token from localStorage if cookies not used
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // your JWT or session token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` || " "; // standard format
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// 🧾 Optional: Add a response interceptor for auto logout / refresh token handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Example: if unauthorized, clear localStorage and redirect to login
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       // Optionally redirect or show message
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );



// export const axiosInstance = axios.create({
//     // baseURL: process.env.REACT_APP_API_BASE_URL, //this is use for react
//     // baseURL : "http://localhost:5000",
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
