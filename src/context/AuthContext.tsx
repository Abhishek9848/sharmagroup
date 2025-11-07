"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/register", "/forgot-password"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (!user && !isPublicRoute) {
      router.replace(`/login`);
    } else if (user && isPublicRoute) {
      router.replace("/");
    }
  }, [user, pathname, loading, router, publicRoutes]);

  const login = async (username: string, password: string, remember: boolean) => {
    if (username === "admin" && password === "1234") {
      if (remember) {
        localStorage.setItem("user", username);
      } else {
        sessionStorage.setItem("user", username);
      }

      setUser(username);

      const redirectTo = "/";
      router.push(redirectTo);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const logout = () => {
    console.log("logoiut")
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
