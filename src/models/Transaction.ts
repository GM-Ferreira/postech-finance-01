export type TransactionType = "Deposit" | "Transfer" | "Payment";

export const transactionTypeDisplayNames: { [key in TransactionType]: string } =
  {
    Deposit: "Depósito",
    Transfer: "Transferência",
    Payment: "Pagamento",
  };

export const transactionSelectOptions = [
  { value: "Deposit", label: "Depósito" },
  { value: "Transfer", label: "Transferência" },
  { value: "Payment", label: "Pagamento" },
];

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
    description?: string,
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.description = description;
  }
}
