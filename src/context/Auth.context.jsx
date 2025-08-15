import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  resetPassword,
  sendResetCode,
  verifyResetCode,
  verifyToken,
} from "../services/auth-services";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const [isLoading , setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  // * Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const response = await verifyToken();
        if (response.success) {
          setIsLoading(false)
          setIsAuthenticated(true);
          setUserInfo(response?.data.decoded);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(response?.data.decoded)
          );
        }
      } catch (error) {
        setIsLoading(false)
        setError(error);
      }
    };

    checkAuth();
  }, [token]);

  // ! Log Out
  function logOut() {
    setToken(null);
    setIsAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  // ^ Send reset Code to Email
  async function SendResetCodeToEmail(values) {
    try {
      const response = await sendResetCode(values);

      if (response.success) {
        toast.success(
          "Reset code sent successfully. Please check your email.",
          {
            position: "top-center",
            autoClose: 4000,
            closeOnClick: true,
          }
        );
        setEmail(values.email);
        setError(null);
      }
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to send reset code.", {
        position: "top-center",
        autoClose: 4000,
      });

      setError(error);
    }
  }

  // * Handle and send reset code
  async function SendingVerificationCode(sendingCode) {
    try {
      const response = await verifyResetCode(sendingCode);
      if (response.success) {
        toast.success("Successfully completed", {
          position: "top-center",
          autoClose: 3000,
        });

        setError(null);
      }

      return response;
    } catch (error) {
      toast.error("An error occurred. Please check reset code or try again.", {
        position: "top-center",
        autoClose: 4000,
      });
      setError(error);
    }
  }

  // ^ Reset New Password
  async function handleResetPassword(values) {
    try {
      const response = await resetPassword(values);
      if (response.success) {
        toast.success("Finally welcome back ✨", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("token", response?.data.token);
        setToken(localStorage.getItem("token"));
        setError(null);
      }

      return response;
    } catch (error) {
      setError(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoading,
        isAuthenticated,
        userInfo,
        logOut,
        SendResetCodeToEmail,
        email,
        SendingVerificationCode,
        handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
