"use client";

import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { Select, SelectOption } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TransactionType } from "@/models/Transaction";
import { useAccount } from "@/context/AccountContext";

const transactionTypes: SelectOption[] = [
  { value: "Deposit", label: "Depósito" },
  { value: "Transfer", label: "Transferência" },
  { value: "Payment", label: "Pagamento" },
];

export default function Home() {
  const { addTransaction } = useAccount();

  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amountNumber = parseFloat(amount.replace(",", "."));
    const typeEnum = transactionType as TransactionType;

    addTransaction(typeEnum, amountNumber);

    setTransactionType("");
    setAmount("");
    alert("Transação adicionada com sucesso!");
  };

  return (
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-gray-500 mb-8">Nova transação</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Select
            placeholder="Selecione o tipo de transação"
            options={transactionTypes}
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="max-w-96"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Valor
          </label>
          <Input
            id="amount"
            type="text"
            placeholder="00,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="max-w-2xs border border-primary"
          />
        </div>

        <div className="pt-4">
          <Button type="submit">Concluir transação</Button>
        </div>
      </form>
    </div>
  );
}
