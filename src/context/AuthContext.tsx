"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require login
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  // 🚀 Auto-redirect logic
  useEffect(() => {
    if (!loading) {
      const isPublicRoute = publicRoutes.includes(pathname);
      if (!user && !isPublicRoute) {
        router.replace("/login");
      } else if (user && isPublicRoute) {
        router.replace("/dashboard");
      }
    }
  }, [user, pathname, loading, router]);

  const login = async (email: string, password: string) => {
    // Mock login — replace with your API
    if (email === "admin@example.com" && password === "1234") {
      localStorage.setItem("user", email);
      setUser(email);
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
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
