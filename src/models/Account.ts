import { Transaction } from "./Transaction";

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
}
