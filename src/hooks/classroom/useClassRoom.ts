import { useState, useCallback } from "react";
import { newClassRoom, getClassRooms } from "../../api/classRoomApi";

interface ApiResponse<T> {
  success?: boolean;
  data: T;
  message?: string;
  
}

interface Classroom {
  id: string;
  subject: string;
  first_language: string;
  second_language: string;
  section: string;
  standard: string;
}

const useClassRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  // ✅ Function to create a new classroom
  const createClassRoom = useCallback(
    async (data: FormData): Promise<ApiResponse<Classroom>> => {
      setLoading(true);
      setError(null);
  
      try {
        
  
        // ✅ Ensure `keys()` is properly recognized
        for (const key of data.keys()) {
          const value = data.get(key);
        
        }
  
        const response = await newClassRoom(data);
       
  
        // ✅ Convert `status` to a number before checking
        const statusCode = Number(response.status);
  
        if (isNaN(statusCode)) {
          throw new Error("Unexpected API response format: Status is not a number.");
        }
  
        if (statusCode === 0) {
          throw new Error(response.message || "Failed to create classroom.");
        }
  
        if (statusCode !== 1) {
          throw new Error(`Unexpected status code: ${statusCode}`);
        }
  
        setClassrooms((prev) => [...prev, response.data]);
  
        return response;
      } catch (err) {
        if (err instanceof Error) {
          console.error("❌ API Error:", err.message);
          setError(err.message);
        } else {
          console.error("❌ Unknown Error:", err);
          setError("An unexpected error occurred.");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  

  const fetchClassRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await getClassRooms();
  
  
      // ✅ Convert `status` to a number before checking
      const statusCode = Number(response.status);
  
      if (isNaN(statusCode)) {
        throw new Error("Unexpected API response format: Status is not a number.");
      }
  
      if (statusCode === 0) {
        throw new Error(response.message || "Failed to fetch classrooms.");
      }
  
      if (statusCode !== 1) {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }
  
      setClassrooms(response.data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);
  

  return { createClassRoom, fetchClassRooms, classrooms, loading, error };
};

export default useClassRoom;
