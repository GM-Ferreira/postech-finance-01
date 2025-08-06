"use client";

import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { AccountService } from "@/services/AccountService";
import { Account } from "@/models/Account";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { Transaction } from "@/models/Transaction";

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

const TransactionItem: React.FC<{ item: Transaction }> = ({ item }) => (
  <div className="flex justify-between items-center border-b border-success/40 py-3">
    <div>
      <p className="text-sm text-success font-semibold">
        {item.date.toLocaleDateString("pt-BR", { month: "long" })}
      </p>
      <p className="text-black">{item.type}</p>
      <p className="font-bold text-black">
        {item.amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-500">
        {item.date.toLocaleDateString("pt-BR")}
      </p>
    </div>
  </div>
);

type GreetinProps = {
  formattedDate: string;
  weekDay: string;
  userName: string;
  account: Account | null;
  showBalance: boolean;
  setShowBalance: (value: SetStateAction<boolean>) => void;
};

const GreetingItem: React.FC<GreetinProps> = ({
  account,
  weekDay,
  userName,
  showBalance,
  setShowBalance,
  formattedDate,
}) => (
  <div className="bg-primary p-6 rounded-lg min-h-[655px] sm:min-h-[400px]">
    <h1 className="text-3xl font-bold text-secondary">
      Olá, {userName} {`! :)`}
    </h1>

    <p className="mt-6  text-secondary">
      {weekDay}, {formattedDate}
    </p>
    {account ? (
      <div className="flex justify-end mt-6 pr-6">
        <div className="max-w-80 min-w-40">
          <div className="flex flex-row gap-6 items-center pb-2 mb-3 pr-9 border-b border-white xl:border-warning">
            <p className="text-secondary">Saldo</p>
            {showBalance ? (
              <EyeIcon
                className="xl:text-warning text-white"
                onClick={() => setShowBalance(!showBalance)}
              />
            ) : (
              <EyeOffIcon
                className="xl:text-warning text-white"
                onClick={() => setShowBalance(!showBalance)}
              />
            )}
          </div>

          <p className="text-secondary">Conta corrente</p>

          <p className="text-secondary text-2xl font-light">
            {showBalance
              ? account.balance.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ ******"}
          </p>
        </div>
      </div>
    ) : (
      <p>Carregando ...</p>
    )}
  </div>
);

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, currentUser } = useAuth();
  const router = useRouter();

  const [account, setAccount] = useState<Account | null>(null);
  const [showBalance, setShowBalance] = useState(false);

  const accountService = useMemo(() => new AccountService(), []);

  const now = new Date();
  const weekDay = now.toLocaleDateString("pt-BR", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("pt-BR");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    const accountData = accountService.getAccountData();
    console.log({ accountData });

    setAccount(accountData);
  }, [accountService]);

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
        md:bg-white md:p-6 md:rounded-lg md:gap-2 md:max-w-44"
      >
        <AppNavigation />
      </nav>

      <main className="flex flex-col gap-6 w-full">
        <GreetingItem
          formattedDate={formattedDate}
          weekDay={weekDay}
          userName={currentUser?.name ?? ""}
          account={account}
          showBalance={showBalance}
          setShowBalance={setShowBalance}
        />

        <div className="bg-zinc-300 p-6 rounded-lg flex-1 min-h-[478px]">
          {children}
        </div>
      </main>

      <aside className="w-full bg-white p-6 rounded-lg md:min-w-64">
        <p className="text-black text-xl font-bold">Extrato</p>
        {account?.transactions.map((transaction) => {
          return <TransactionItem key={transaction.id} item={transaction} />;
        })}
      </aside>

      {/* TODO - adicioanr footer no futuro*/}
    </div>
  );
}
