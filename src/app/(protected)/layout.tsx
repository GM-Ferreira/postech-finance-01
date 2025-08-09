"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useAccount } from "@/context/AccountContext";

import { useAuth } from "@/hooks/useAuth";
import { Account } from "@/models/Account";
import { EyeIcon, EyeOffIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { Transaction, TransactionType } from "@/models/Transaction";
import { CurrencyUtils } from "@/lib/utils/CurrencyUtils";

const NavigationSection = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: "/home", label: "Início" },
    { href: "/investments", label: "Investimentos" },
    { href: "/cards", label: "Cartões" },
  ];

  return (
    <nav
      className="w-full
        flex flex-row justify-around items-center py-4
        md:flex-col md:justify-start md:items-stretch 
        md:bg-[#f5f5f5] md:p-6 md:rounded-lg md:gap-2 md:max-w-44"
    >
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
    </nav>
  );
};

type GreetinSectionProps = {
  formattedDate: string;
  weekDay: string;
  userName: string;
  account: Account | null;
  showBalance: boolean;
  setShowBalance: (value: SetStateAction<boolean>) => void;
};

const GreetingSection: React.FC<GreetinSectionProps> = ({
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
              ? CurrencyUtils.formatBRL(account.balance)
              : "R$ ******"}
          </p>
        </div>
      </div>
    ) : (
      <p>Carregando ...</p>
    )}
  </div>
);

const transactionTypeDisplayNames: { [key in TransactionType]: string } = {
  Deposit: "Depósito",
  Transfer: "Transferência",
  Payment: "Pagamento",
};

type TransactionItemProps = {
  transaction: Transaction;
  isDeleteModeActive: boolean;
  isSelected: boolean;
  onSelectionChange: (id: string) => void;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  isDeleteModeActive,
  isSelected,
  onSelectionChange,
}) => (
  <div className="flex items-center gap-4 border-b border-success/40 py-3">
    {isDeleteModeActive && (
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelectionChange(transaction.id)}
        className="form-checkbox min-h-4 max-h-5 min-w-4 max-w-5 text-primary rounded accent-warning"
      />
    )}
    <div className="flex flex-grow justify-between items-center">
      <div>
        <p className="text-sm text-success font-semibold">
          {transaction.date.toLocaleDateString("pt-BR", { month: "long" })}
        </p>
        <p className="text-black">
          {transactionTypeDisplayNames[transaction.type]}
        </p>
        <p className="font-bold text-black">
          {CurrencyUtils.formatBRL(transaction.amount)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">
          {transaction.date.toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  </div>
);

type StatementSectionProps = {
  visibleTransactions: Transaction[] | undefined;
  account: Account | null;
  visibleCount: number;
  loadMoreTransaction: () => void;
  deleteTransactions: (idsToDelete: string[]) => void;
};

const StatementSection: React.FC<StatementSectionProps> = ({
  visibleTransactions,
  account,
  visibleCount,
  loadMoreTransaction,
  deleteTransactions,
}) => {
  const [isDeleteModeActive, setIsDeleteModeActive] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set<string>());

  const toggleRemoveMode = () => {
    setIsDeleteModeActive(!isDeleteModeActive);

    if (isDeleteModeActive) {
      setSelectedIds(new Set());
    }
  };

  const handleSelectionChange = (transactionId: string) => {
    const newSelectedIds = new Set(selectedIds);

    if (newSelectedIds.has(transactionId)) {
      newSelectedIds.delete(transactionId);
    } else {
      newSelectedIds.add(transactionId);
    }

    setSelectedIds(newSelectedIds);
  };

  const handleDeleteSelected = () => {
    const idsToDelete = Array.from(selectedIds);

    deleteTransactions(idsToDelete);

    const count = idsToDelete.length;
    let message: string;
    if (count === 1) {
      message = "1 transação removida com sucesso!";
    } else {
      message = `${count} transações removidas com sucesso!`;
    }

    alert(message);

    toggleRemoveMode();
  };

  return (
    <aside className="w-full bg-[#f5f5f5] p-6 rounded-lg md:min-w-72">
      <div className="flex justify-between items-center mb-4">
        <p className="text-black text-xl font-bold">Extrato</p>

        <div className="flex gap-2">
          <div
            onClick={isDeleteModeActive ? undefined : toggleRemoveMode}
            className={`flex items-center justify-center rounded-full p-2 transition-colors ${
              isDeleteModeActive
                ? "bg-red-500 opacity-50 cursor-default"
                : "bg-primary cursor-pointer"
            }`}
          >
            <TrashIcon className="text-white" size={20} />
          </div>

          <div
            onClick={() => {
              console.log("Edit action");
            }}
            className={`flex items-center justify-center rounded-full p-2 transition-colors ${
              isDeleteModeActive
                ? "bg-gray-400 opacity-15 cursor-default"
                : "bg-primary cursor-pointer"
            }`}
          >
            <PencilIcon className="text-white" size={20} />
          </div>
        </div>
      </div>

      {isDeleteModeActive && (
        <div className="flex flex-1 gap-2">
          <div
            onClick={handleDeleteSelected}
            className="flex w-1/2 justify-center mt-4 border border-warning rounded-lg py-2 cursor-pointer"
          >
            <p className="text-warning">Apagar</p>
          </div>
          <div
            onClick={toggleRemoveMode}
            className="flex flex-1 justify-center mt-4 border border-gray-400 rounded-lg py-2 cursor-pointer"
          >
            <p className="text-gray-600">Cancelar</p>
          </div>
        </div>
      )}

      {visibleTransactions?.map((transaction) => {
        return (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            isDeleteModeActive={isDeleteModeActive}
            isSelected={selectedIds.has(transaction.id)}
            onSelectionChange={handleSelectionChange}
          />
        );
      })}

      {!isDeleteModeActive &&
        account?.transactions &&
        visibleCount < account.transactions.length && (
          <div
            onClick={loadMoreTransaction}
            className="flex justify-center mt-4 border border-gray-300 rounded-lg py-2"
          >
            <p className="text-success">Carregar mais itens</p>
          </div>
        )}
    </aside>
  );
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, currentUser } = useAuth();
  const { account, showBalance, setShowBalance, deleteTransactions } =
    useAccount();

  const [visibleCount, setVisibleCount] = useState(10);

  const router = useRouter();

  const now = new Date();
  const weekDay = now.toLocaleDateString("pt-BR", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("pt-BR");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  const visibleTransactions = account?.transactions.slice(0, visibleCount);

  const loadMoreTransaction = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

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
      <NavigationSection />

      <main className="flex flex-col gap-6 w-full">
        <GreetingSection
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

      <StatementSection
        account={account}
        loadMoreTransaction={loadMoreTransaction}
        visibleCount={visibleCount}
        visibleTransactions={visibleTransactions}
        deleteTransactions={deleteTransactions}
      />

      {/* TODO - adicioanr footer no futuro*/}
    </div>
  );
}
