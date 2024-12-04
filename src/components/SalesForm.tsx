import React, { useState } from 'react';
import { useSales } from '../context/SalesContext';
import { PlusCircle, Package, Calendar, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export function SalesForm() {
  const { addSale } = useSales();
  const [formData, setFormData] = useState({
    amount: '',
    product: '1',
    customer: '',
    trackingCode: '',
    date: new Date(),
    paymentStatus: 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saleData = {
      amount: Number(formData.amount) || 0,
      product: Number(formData.product) || 1,
      customer: formData.customer,
      trackingCode: formData.trackingCode.trim() || undefined,
      date: formData.date,
      paymentStatus: formData.paymentStatus,
      investment: 0,
    };
    addSale(saleData);
    setFormData({
      amount: '',
      product: '1',
      customer: '',
      trackingCode: '',
      date: new Date(),
      paymentStatus: 'pending',
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'amount' | 'product') => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Nova Venda</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <DatePicker
              selected={formData.date}
              onChange={(date: Date) => setFormData({ ...formData, date })}
              className="block w-full pl-10 sm:text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantidade de Produtos</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={formData.product}
            onChange={(e) => handleNumberChange(e, 'product')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente</label>
          <input
            type="text"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Código de Rastreio
              <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">(opcional)</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={formData.trackingCode}
                onChange={(e) => setFormData({ ...formData, trackingCode: e.target.value })}
                className="block w-full pl-10 sm:text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Digite o código"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status do Pagamento</label>
            <div className="mt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentStatus: 'paid' })}
                className={`transition-colors ${
                  formData.paymentStatus === 'paid'
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title="Pago"
              >
                <CheckCircle className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentStatus: 'pending' })}
                className={`transition-colors ${
                  formData.paymentStatus === 'pending'
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title="Pendente"
              >
                <Clock className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentStatus: 'unpaid' })}
                className={`transition-colors ${
                  formData.paymentStatus === 'unpaid'
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
                title="Não Pago"
              >
                <XCircle className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor da Venda</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">R$</span>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={formData.amount}
              onChange={(e) => handleNumberChange(e, 'amount')}
              className="block w-full pl-12 sm:text-sm rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0,00"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          Adicionar Venda
        </button>
      </div>
    </form>
  );
}