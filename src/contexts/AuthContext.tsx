
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock login - in a real app, you'd validate against a backend
    try {
      // Mock successful login
      const mockUser: User = {
        id: "user-" + Date.now(),
        name: email.split('@')[0], // Extract name from email
        email
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // This is a mock signup - in a real app, you'd create a user in the backend
    try {
      // Mock successful signup
      const mockUser: User = {
        id: "user-" + Date.now(),
        name,
        email
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
