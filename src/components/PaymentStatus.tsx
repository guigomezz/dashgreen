import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSales } from '../context/SalesContext';

interface PaymentStatusProps {
  saleId: string;
  status: 'paid' | 'pending' | 'unpaid';
}

export function PaymentStatus({ saleId, status }: PaymentStatusProps) {
  const { updatePaymentStatus } = useSales();

  const handleStatusChange = (newStatus: 'paid' | 'pending' | 'unpaid') => {
    updatePaymentStatus(saleId, newStatus);
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <button
        onClick={() => handleStatusChange('paid')}
        className={`transition-colors ${
          status === 'paid' ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
        }`}
        title="Pago"
      >
        <CheckCircle className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleStatusChange('pending')}
        className={`transition-colors ${
          status === 'pending' ? 'text-blue-500' : 'text-gray-300 hover:text-gray-400'
        }`}
        title="Pendente"
      >
        <Clock className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleStatusChange('unpaid')}
        className={`transition-colors ${
          status === 'unpaid' ? 'text-red-500' : 'text-gray-300 hover:text-gray-400'
        }`}
        title="Não Pago"
      >
        <XCircle className="w-5 h-5" />
      </button>
    </div>
  );
}