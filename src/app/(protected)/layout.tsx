"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

const AppNavigation = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: "/home", label: "Início" },
    { href: "/investments", label: "Investimentos" },
    { href: "/cards", label: "Cartões" },
  ];

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`
                block rounded-lg px-4 py-3 transition-colors
                self-center
                ${!isActive ? "md:hover:bg-gray-200 hover:bg-success/50" : ""}
              `}
          >
            <span
              className={`
                font-semibold
                ${
                  isActive
                    ? "text-success border-b-2 border-success"
                    : "text-black"
                }
              `}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, currentUser } = useAuth();

  const router = useRouter();

  const now = new Date();
  const weekDay = now.toLocaleDateString("pt-BR", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("pt-BR");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-4 grid grid-cols-1 
      gap-6 md:min-h-screen md:grid-cols-[auto_1fr_auto]"
    >
      <nav
        className="w-full
        flex flex-row justify-around items-center py-4 bg-
        md:flex-col md:justify-start md:items-stretch 
        md:bg-white md:p-6 md:rounded-lg md:gap-6 md:max-w-44"
      >
        <AppNavigation />
      </nav>

      <main className="flex flex-col gap-6 w-full">
        <div className="bg-primary p-6 rounded-lg min-h-[655px] sm:min-h-[400px]">
          <h1 className="text-3xl font-bold text-secondary">
            Olá, {currentUser?.name ?? ""} {`! :)`}
          </h1>

          <p className="mt-6  text-secondary">
            {weekDay}, {formattedDate}
          </p>
        </div>

        <div className="bg-zinc-300 p-6 rounded-lg flex-1 min-h-[478px]">
          {children}
        </div>
      </main>

      <aside className="w-full bg-white p-6 rounded-lg md:min-w-52">
        <p className="text-black text-xl font-bold">Extrato</p>
      </aside>

      {/* TODO - adicioanr footer no futuro*/}
    </div>
  );
}
