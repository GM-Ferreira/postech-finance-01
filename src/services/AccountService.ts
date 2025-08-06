import { StorageService } from "./StorageService";
import { Account } from "@/models/Account";
import { Transaction, TransactionType } from "@/models/Transaction";

type TransactionData = {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description?: string;
};

export class AccountService {
  private storageService: StorageService;
  private static readonly ACCOUNT_KEY = "@bytebank/account-data";

  constructor() {
    this.storageService = new StorageService();
  }

  public saveAccountData(account: Account): void {
    this.storageService.setItem(AccountService.ACCOUNT_KEY, account);
  }

  private createInitialAccount(): Account {
    const finalAccount = new Account(2500);
    finalAccount.transactions = [
      new Transaction("Transferência", -500, new Date("2025-07-21")),
      new Transaction("Depósito", 50, new Date("2025-07-21")),
      new Transaction("Depósito", 100, new Date("2025-07-21")),
      new Transaction("Depósito", 150, new Date("2025-07-18")),
    ];

    return finalAccount;
  }

  public getAccountData(): Account {
    const savedData = this.storageService.getItem<{
      balance: number;
      transactions: TransactionData[];
    }>(AccountService.ACCOUNT_KEY);

    if (savedData) {
      const transactions = savedData.transactions
        .map(
          (t) =>
            new Transaction(t.type, t.amount, new Date(t.date), t.description)
        )
        .sort((a, b) => (a.date > b.date ? 1 : -1));

      return new Account(savedData.balance, transactions);
    }

    const initialAccount = this.createInitialAccount();
    this.saveAccountData(initialAccount);

    return initialAccount;
  }
}
