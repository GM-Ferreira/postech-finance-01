"use client";

import { useAuth } from "@/hooks/useAuth";

import { StringUtils } from "@/lib/utils/StringUtils";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  const now = new Date();
  const weekDay = now.toLocaleDateString("pt-BR", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("pt-BR");
  const userName = StringUtils.toPascalCase(currentUser?.name ?? "");

  return (
    <div className="bg-primary p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-secondary">
        Olá, {userName} {`! :)`}
      </h1>

      <p className="mt-6  text-secondary">
        {weekDay}, {formattedDate}
      </p>
    </div>
  );
}
