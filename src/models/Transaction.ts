export type TransactionType = "Depósito" | "Transferência" | "Pagamento";

export class Transaction {
  public id: string;
  public type: TransactionType;
  public amount: number;
  public date: Date;
  public description?: string;

  constructor(
    type: TransactionType,
    amount: number,
    date: Date,
    description?: string
  ) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.description = description;
  }

  get isCredit(): boolean {
    return this.amount > 0;
  }
}
