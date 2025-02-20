import { useState, useCallback } from "react";
import { newStudent, getStudents } from "../../api/studentApi";

// ✅ Define API response structure
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ✅ Define Student structure
interface Student {
  id?: string;
  name: string;
  gender: string;
  mobile_number: string;
  DOB: string;
  register_no: string;
  parent_mobile_number: string;
}

const useStudent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  // ✅ Function to create a new student
  const createStudent = useCallback(async (data: FormData): Promise<ApiResponse<Student>> => {
    setLoading(true);
    setError(null);

    try {
      console.log("🟢 Checking FormData before sending:", Object.fromEntries(data));

      const response = await newStudent(data);
      console.log("🟢 API Response:", response);

      // ✅ Convert `status` to a number before checking
      const statusCode = Number(response.status);

      if (isNaN(statusCode)) {
        throw new Error("Unexpected API response format: Status is not a number.");
      }

      if (statusCode === 0) {
        throw new Error(response.message || "Failed to create student.");
      }

      if (statusCode !== 1) {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }

      setStudents((prev) => [...prev, response.data]);

      return response;
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Function to fetch all students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getStudents();
      console.log("🟢 Fetch API response:", response);

      // ✅ Convert `status` to a number before checking
      const statusCode = Number(response.status);

      if (isNaN(statusCode)) {
        throw new Error("Unexpected API response format: Status is not a number.");
      }

      if (statusCode === 0) {
        throw new Error(response.message || "Failed to fetch students.");
      }

      if (statusCode !== 1) {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }

      setStudents(response.data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { createStudent, fetchStudents, students, loading, error };
};

export default useStudent;
