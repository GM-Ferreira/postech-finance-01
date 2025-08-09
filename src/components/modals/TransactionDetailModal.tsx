"use client";

import { Modal } from "@/components/ui/Modal";
import { Transaction } from "@/models/Transaction";
import { CurrencyUtils } from "@/lib/utils/CurrencyUtils";
import { PencilIcon, TrashIcon } from "@/components/icons";

const transactionTypeDisplayNames = {
  Deposit: "Depósito",
  Transfer: "Transferência",
  Payment: "Pagamento",
};

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div className="text-left w-full mb-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-black font-semibold text-lg">{value || "-"}</p>
  </div>
);

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!transaction) {
    return null;
  }

  console.log("TransactionDetailModal transaction:", transaction);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-black mb-6">
          Detalhes da Transação
        </h2>

        <div className="w-full max-w-sm">
          <DetailRow
            label="Tipo de Transação"
            value={transactionTypeDisplayNames[transaction.type]}
          />

          <DetailRow
            label="Valor"
            value={CurrencyUtils.formatBRL(transaction.amount)}
          />

          <DetailRow
            label="Data e Hora"
            value={transaction.date.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />

          <DetailRow label="Descrição" value={transaction.description} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => console.log("EXCLUIR transação:", transaction.id)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <TrashIcon size={18} />
            Excluir
          </button>
          <button
            onClick={() => console.log("EDITAR transação:", transaction.id)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 rounded-md bg-primary text-white hover:bg-black transition-colors"
          >
            <PencilIcon size={18} />
            Editar
          </button>
        </div>
      </div>
    </Modal>
  );
};
