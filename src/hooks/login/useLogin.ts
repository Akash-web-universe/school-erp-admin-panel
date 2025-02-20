import { useState } from "react";
import loginApi from "../../api/authApi"; // Importing the login API


// Define API Response type
interface LoginResponse {
  token: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(email, password);

      // Store the token in sessionStorage
      sessionStorage.setItem("authToken", data.token);

      console.log("✅ Login Successful. Redirecting...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
    } catch (error: any) {
      console.error("❌ Login Failed:", error.message);
      setError(error.message); // Display API error message
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
  };
};

export default useLogin;


