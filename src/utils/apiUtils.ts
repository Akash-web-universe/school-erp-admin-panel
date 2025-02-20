import axios from "axios";

const SCHOOL_URL = import.meta.env.VITE_API_BASE_URL;

const token = sessionStorage.getItem("authToken");

// ✅ Axios instance with default headers
export const apiUtils = axios.create({
    baseURL: SCHOOL_URL,
    headers: {
        "Content-Type": "application/json",
        "access-token": token,
    },
});


