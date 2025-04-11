import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      // Ensure the user object has the correct ID format
      const normalizedUser = {
        ...userData,
        id: Number(userData.id), // Ensure ID is a number
      };
      setCurrentUser(normalizedUser);
      setIsAuthenticated(true);
      console.log("Loaded user from storage:", normalizedUser); // For debugging
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password) => {
    try {
      // Check if user already exists
      const existingUsers = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );

      if (existingUsers.data.length > 0) {
        throw new Error("User with this email already exists");
      }

      const response = await axios.post("http://localhost:3001/users", {
        username,
        email,
        password, // In a real app, you would hash this password
      });

      const user = response.data;
      // Ensure the user object has the correct ID format
      const userData = {
        ...user,
        id: Number(user.id), // Ensure ID is a number
      };

      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Registered user:", userData); // For debugging
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );

      if (response.data.length === 0) {
        throw new Error("Invalid credentials");
      }

      const user = response.data[0];
      // Ensure the user object has the correct ID format
      const userData = {
        ...user,
        id: Number(user.id), // Ensure ID is a number
      };

      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Logged in user:", userData); // For debugging
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
