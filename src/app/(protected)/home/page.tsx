"use client";

import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

import { useAccount } from "@/context/AccountContext";

import { Button } from "@/components/ui/Button";
import { Select, SelectOption } from "@/components/ui/Select";
import { TransactionType } from "@/models/Transaction";

const transactionTypes: SelectOption[] = [
  { value: "Deposit", label: "Depósito" },
  { value: "Transfer", label: "Transferência" },
  { value: "Payment", label: "Pagamento" },
];

export default function Home() {
  const { addTransaction } = useAccount();

  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState<string | undefined>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amountString = amount || "0";
    const amountNumber = parseFloat(amountString.replace(",", "."));
    const typeEnum = transactionType as TransactionType;

    if (isNaN(amountNumber) || !typeEnum || amountNumber === 0) {
      alert("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

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
          <CurrencyInput
            id="amount"
            name="amount"
            placeholder="R$ 0,00"
            allowDecimals
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            value={amount}
            onValueChange={(value) => setAmount(value)}
            className="mt-1 block w-full max-w-2xs rounded-md border 
            border-primary shadow-sm h-12 px-4 bg-white text-zinc-500 
            focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="pt-4">
          <Button type="submit">Concluir transação</Button>
        </div>
      </form>
    </div>
  );
}
