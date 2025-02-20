import { useState, useCallback } from "react";
import { newStaff, getStaff } from "../../api/staffApi";

// ✅ Define API response structure
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ✅ Define Staff structure
interface Staff {
  id?: string;
  name: string;
  gender: string;
  email: string;
  mobile_number: string;
  DOB: string;
  address: string;
  education_qualification: string;
  staff_type: string;
  designation: string;
}

const useStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  // ✅ Function to create a new staff
  const createStaff = useCallback(async (data: FormData): Promise<ApiResponse<Staff>> => {
    setLoading(true);
    setError(null);

    try {
      console.log("🟢 Checking FormData before sending:", Object.fromEntries(data));

      const response = await newStaff(data);
      console.log("🟢 API Response:", response);

      // ✅ Convert `status` to a number before checking
      const statusCode = Number(response.status);

      if (isNaN(statusCode)) {
        throw new Error("Unexpected API response format: Status is not a number.");
      }

      if (statusCode === 0) {
        throw new Error(response.message || "Failed to create staff.");
      }

      if (statusCode !== 1) {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }

      setStaffs((prev) => [...prev, response.data]);

      return response;
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Function to fetch all Staff
  const fetchStaffs = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await getStaff();
      
  
      // ✅ Convert `status` to a number before checking
      const statusCode = Number(response.status);
  
      if (isNaN(statusCode)) {
        throw new Error("Unexpected API response format: Status is not a number.");
      }
  
      if (statusCode === 0) {
        throw new Error(response.message || "Failed to fetch staff members.");
      }
  
      if (statusCode !== 1) {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }
  
      setStaffs(response.data); // ✅ Set data without throwing an error
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);
  

  return { createStaff, fetchStaffs, staffs, loading, error };
};

export default useStaff;
