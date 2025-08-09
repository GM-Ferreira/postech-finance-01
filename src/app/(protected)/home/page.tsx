"use client";

import { useForm, Controller } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";

import { useAccount } from "@/context/AccountContext";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  TransactionFormData,
  TransactionFormInput,
} from "@/lib/schemas/transactionSchema";
import { Button } from "@/components/ui/Button";
import { Select, SelectOption } from "@/components/ui/Select";

const transactionTypes: SelectOption[] = [
  { value: "Deposit", label: "Depósito" },
  { value: "Transfer", label: "Transferência" },
  { value: "Payment", label: "Pagamento" },
];

export default function Home() {
  const { addTransaction } = useAccount();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TransactionFormInput, undefined, TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onSubmit",
    defaultValues: {
      type: undefined,
      amount: "",
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    const amountAsNumber = parseFloat(data.amount.replace(",", "."));

    addTransaction(data.type, amountAsNumber);

    alert("Transação adicionada com sucesso!");
    reset();
  };

  return (
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-gray-500 mb-8">Nova transação</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || ""}
                placeholder="Selecione o tipo de transação"
                options={transactionTypes}
                className={`max-w-96 ${errors.type && "border-red-500"}`}
              />
            )}
          />
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Valor
          </label>

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                id="amount"
                name={field.name}
                value={field.value}
                ref={field.ref}
                onBlur={field.onBlur}
                placeholder="R$ 0,00"
                allowDecimals
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="R$ "
                onValueChange={(value) =>
                  field.onChange(value === undefined ? "" : value)
                }
                className={`mt-1 block w-full max-w-2xs rounded-md border
                  shadow-sm h-12 px-4 bg-white text-zinc-500 
                  ${errors.amount ? "border-red-500" : "border-primary"}`}
              />
            )}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div className="pt-4">
          <Button type="submit">Adicionar transação</Button>
        </div>
      </form>
    </div>
  );
}
