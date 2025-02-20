import { apiUtils as apiClient } from "../utils/apiUtils";
import axios from "axios";

const SCHOOL_URL = import.meta.env.VITE_API_BASE_URL;

// Define API response format
interface ApiResponse<T> {
  status: number; // Update the type to number
  message: string;
  data: T;
}

// Define Classroom data structure
interface Classroom {
  id: string;
  subject: string;
  first_language: string;
  second_language: string;
  section: string;
  standard: string;
}

// ✅ Function to create a new classroom
export const newClassRoom = async (data: FormData): Promise<ApiResponse<Classroom>> => {
  try {
    const token = sessionStorage.getItem("authToken");

    const headers = {
      "access-token": token || "", // Ensure token is a valid string
    };

   

    const response = await axios.post<ApiResponse<Classroom>>(
      `${SCHOOL_URL}/academy/classroom/register`,
      data,
      { headers }
    );

    

    // ✅ Check if `status` exists and handle response accordingly
    if (!("status" in response.data)) {
      throw new Error("Unexpected API response format: Missing status field.");
    }

    if (response.data.status === 0) {
      throw new Error(response.data.message || "Failed to create classroom.");
    }

    if (response.data.status !== 1) {
      throw new Error(`Unexpected status code: ${response.data.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Request failed. Please try again later.");
  }
};


// ✅ Function to get classrooms
export const getClassRooms = async (): Promise<ApiResponse<Classroom[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Classroom[]>>("/academy/classroom");

   

    // ✅ Convert status to number before checking
    const statusCode = Number(response.data.status);

    if (isNaN(statusCode)) {
      throw new Error("Unexpected API response format: Status is not a number.");
    }

    if (statusCode === 0) {
      throw new Error(response.data.message || "Failed to fetch classrooms.");
    }

    if (statusCode !== 1) {
      throw new Error(`Unexpected status code: ${statusCode}`);
    }

    return response.data;

  } catch (error: any) {
    console.error("❌ API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Request failed. Please try again later.");
  }
};


