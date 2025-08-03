import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Postech Finance App",
  description: "Melhor local para sua gestão financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable}`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
