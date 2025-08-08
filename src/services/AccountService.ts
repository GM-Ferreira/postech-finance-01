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
      new Transaction("Transfer", -500, new Date("2025-07-21")),
      new Transaction("Deposit", 50, new Date("2025-07-21")),
      new Transaction("Deposit", 100, new Date("2025-07-21")),
      new Transaction("Deposit", 150, new Date("2025-07-18")),
    ];

    finalAccount.transactions.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

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
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      return new Account(savedData.balance, transactions);
    }

    const initialAccount = this.createInitialAccount();
    this.saveAccountData(initialAccount);

    return initialAccount;
  }

  public addTransaction(
    type: TransactionType,
    amount: number,
    date: Date,
    description?: string
  ): Account {
    const currentAccount = this.getAccountData();

    currentAccount.addTransaction(type, amount, date, description);

    currentAccount.transactions.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    this.saveAccountData(currentAccount);

    return currentAccount;
  }
}
