import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface DailyInvestmentCellProps {
  date: string;
  investment: number;
  onInvestmentChange: (date: string, value: number) => void;
}

export function DailyInvestmentCell({ date, investment, onInvestmentChange }: DailyInvestmentCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(investment.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    const numValue = Number(inputValue) || 0;
    onInvestmentChange(date, numValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <DollarSign className="w-4 h-4 text-red-500 dark:text-red-400" />
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-24 px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring focus:ring-red-200 dark:focus:ring-red-800 focus:ring-opacity-50"
          placeholder="Investimento"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          {formatCurrency(investment)}
        </button>
      )}
    </div>
  );
}