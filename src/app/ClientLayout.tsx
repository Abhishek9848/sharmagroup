"use client";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import SlidingLoginSignup from "@/components/Auth/page";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authRoutes = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authRoutes.includes(pathname);
  return (
    <AuthProvider >
      {isAuthPage ? (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020d1a]">
          <SlidingLoginSignup />
        </main>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
            <Header />
            <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
              {children}
            </main>
          </div>
        </div>
      )}
    </AuthProvider>
  );
}
