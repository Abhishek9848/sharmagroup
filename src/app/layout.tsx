import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Providers } from "./providers";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | Sharma Group",
    default: "Sharma Group",
  },
  description: "s",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster />
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
