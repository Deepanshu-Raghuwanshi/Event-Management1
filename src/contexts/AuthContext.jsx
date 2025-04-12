import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_BE_API_URL;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);

      const normalizedUser = {
        ...userData,
        id: Number(userData.id),
      };
      setCurrentUser(normalizedUser);
      setIsAuthenticated(true);
      console.log("Loaded user from storage:", normalizedUser);
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password) => {
    try {
      const existingUsers = await axios.get(`${API_URL}/users?email=${email}`);

      if (existingUsers.data.length > 0) {
        throw new Error("User with this email already exists");
      }

      const response = await axios.post(`${API_URL}/users`, {
        username,
        email,
        password,
      });

      const user = response.data;
      const userData = {
        ...user,
        id: Number(user.id),
      };

      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Registered user:", userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.get(
        `${API_URL}/users?email=${email}&password=${password}`
      );

      if (response.data.length === 0) {
        throw new Error("Invalid credentials");
      }

      const user = response.data[0];
      const userData = {
        ...user,
        id: Number(user.id),
      };

      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
