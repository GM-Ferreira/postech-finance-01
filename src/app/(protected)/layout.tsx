"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto p-4">{children}</main>
      {/* TODO - adicioanr footer no futuro*/}
    </>
  );
}
