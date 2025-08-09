"use client";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";

import { AccountService } from "@/services/AccountService";
import { Account } from "@/models/Account";
import { TransactionType } from "@/models/Transaction";
import { getDeviceInfo } from "@/lib/utils/BrowserInfo";

type AccountContextType = {
  account: Account | null;
  showBalance: boolean;
  setShowBalance: (value: SetStateAction<boolean>) => void;
  addTransaction: (type: TransactionType, amount: number) => void;
  deleteTransactions: (idsToDelete: string[]) => void;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const accountService = useMemo(() => new AccountService(), []);

  const [account, setAccount] = useState<Account | null>(null);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    setAccount(accountService.getAccountData());
  }, [accountService]);

  const addTransaction = (type: TransactionType, amount: number) => {
    const deviceInfo = getDeviceInfo();
    const description = `Adicionado via ${deviceInfo.os} - ${deviceInfo.browser}`;

    const updatedAccount = accountService.addTransaction(
      type,
      amount,
      new Date(),
      description
    );

    setAccount(
      new Account(updatedAccount.balance, updatedAccount.transactions)
    );
  };

  const deleteTransactions = (idsToDelete: string[]) => {
    const updatedAccount = accountService.deleteTransactions(idsToDelete);

    if (updatedAccount) {
      setAccount(
        new Account(updatedAccount.balance, updatedAccount.transactions)
      );
    }
  };

  const value = {
    account,
    showBalance,
    setShowBalance,
    addTransaction,
    deleteTransactions,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error("useAccount deve ser usado dentro de um AccountProvider");
  }
  return context;
};
