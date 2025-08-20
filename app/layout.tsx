"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar on login and register
  const hideNavbarOn = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarOn.includes(pathname.toLowerCase());

  return (
    <html lang="en">
      <AuthProvider>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {shouldShowNavbar && <Navbar />}
        <main className={shouldShowNavbar ? "pt-20 container mx-auto px-4 py-4" : ""}>
          {children}
        </main>
      </body>
      </AuthProvider>
    </html>
  );
}
