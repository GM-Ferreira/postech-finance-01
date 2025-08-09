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

  deleteTransactions(idsToDelete: string[]): void {
    if (!idsToDelete || idsToDelete.length === 0) {
      return;
    }

    const idsSet = new Set(idsToDelete);

    const amountToRevert = this.transactions
      .filter((transaction) => idsSet.has(transaction.id))
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    this.transactions = this.transactions.filter(
      (transaction) => !idsSet.has(transaction.id)
    );

    this.balance -= amountToRevert;
  }
}
