"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { StateProvider } from "@/context/ContextProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StateProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </StateProvider>

  );
}
