import axios from "axios"


export const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL, //this is use for react
    // baseURL : "http://localhost:5000",
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
