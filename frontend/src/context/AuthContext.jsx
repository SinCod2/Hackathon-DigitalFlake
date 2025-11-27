import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Configure axios base URL
axios.defaults.baseURL = "http://localhost:5000";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data);
      // Clear invalid token
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Register error:", error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      return {
        success: true,
        message: response.data.message,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Request failed",
      };
    }
  };

  const resetPassword = async (resetToken, password) => {
    try {
      const response = await axios.post(
        `/api/auth/reset-password/${resetToken}`,
        { password }
      );
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Password reset failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
