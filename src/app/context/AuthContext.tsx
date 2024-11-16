"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { AuthContextType } from "@/app/types/AuthContextType";
import { useRouter } from "next/navigation";
import api from "../lib/axiosCall";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("APP-TOKEN");
    const rememberToken = Cookies.get("APP-REMEMBER-TOKEN");

    if (token || rememberToken) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    const token = Cookies.get("APP-TOKEN");
    const rememberToken = Cookies.get("APP-REMEMBER-TOKEN");

    if (!token || !rememberToken) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      const response = await api.get("/auth/profile");

      if (
        response.data.statusCode === 200 &&
        response.data.user.remember_token === rememberToken
      ) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      console.error("Failed to fetch user profile", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, rememberToken: string) => {
    setIsAuthenticated(true);
    Cookies.set("APP-TOKEN", token);
    Cookies.set("APP-REMEMBER-TOKEN", rememberToken);
    fetchUserProfile();
    router.push("/login");
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("APP-TOKEN");
    Cookies.remove("APP-REMEMBER-TOKEN");

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
