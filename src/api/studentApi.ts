import { apiUtils as apiClient } from "../utils/apiUtils";
import axios from "axios";

const SCHOOL_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Define API response format
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ✅ Define Student data structure
interface Student {
  id: string;
  name: string;
  gender: string;
  mobile_number: string;
  DOB: string;
  register_no: string;
  parent_mobile_number: string;
}

// ✅ Function to create a new student
export const newStudent = async (data: FormData): Promise<ApiResponse<Student>> => {
  try {
    const token = sessionStorage.getItem("authToken");

    const headers = {
      "access-token": token || "",
    };

    console.log("🟢 Sending API request...", Object.fromEntries(data));

    const response = await axios.post<ApiResponse<Student>>(
      `${SCHOOL_URL}/student/register`,
      data,
      { headers }
    );

    console.log("🟢 API response:", response.data);

    if (response.data.status !== 1) {
      throw new Error(response.data.message || "Failed to create student.");
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Request failed. Please try again later.");
  }
};

// ✅ Function to get all students
export const getStudents = async (): Promise<ApiResponse<Student[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Student[]>>("/student");

    console.log("🟢 Fetch API response:", response.data);

    // ✅ Convert status to number
    const statusCode = Number(response.data.status);

    if (isNaN(statusCode)) {
      throw new Error("Unexpected API response format: Status is not a number.");
    }

    if (statusCode === 0) {
      throw new Error(response.data.message || "Failed to fetch students.");
    }

    if (statusCode !== 1) {
      throw new Error(`Unexpected status code: ${statusCode}`);
    }

    return response.data; // ✅ Now it correctly returns data
  } catch (error: any) {
    console.error("❌ API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Request failed. Please try again later.");
  }
};
