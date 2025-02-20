import axios from "axios";

// Your API URL
const SCHOOL_URL = import.meta.env.VITE_API_BASE_URL;

// Define response type (you can adjust it based on actual API response)
interface LoginResponse {
  token: string;
  status: number;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// loginApi function with type annotations
const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${SCHOOL_URL}/academy/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // If the API returns status 0, throw an error
    if (response.data.status === 0) {
      throw new Error(response.data.message || "Invalid credentials.");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed. Please try again later.");
  }
};

export default loginApi;

