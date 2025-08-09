import { Transaction, TransactionType } from "./Transaction";

export class Account {
  public balance: number;
  public transactions: Transaction[];

  constructor(
    initialBalance: number = 0,
    initialTransactions: Transaction[] = []
  ) {
    this.balance = initialBalance;
    this.transactions = initialTransactions;
  }

  addTransaction(
    type: TransactionType,
    amount: number,
    date: Date,
    description?: string
  ): void {
    const newTransaction = new Transaction(type, amount, date, description);
    this.transactions.push(newTransaction);
    this.balance += amount;
  }
}
