import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface DailyInvestmentProps {
  date: string;
  investment: number;
  onInvestmentChange: (date: string, value: number) => void;
}

export function DailyInvestment({ date, investment, onInvestmentChange }: DailyInvestmentProps) {
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
    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      <span className="text-xs">Investimento:</span>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5" />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-20 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-500 px-1 py-0.5 text-sm outline-none"
            placeholder="0,00"
            autoFocus
          />
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>{formatCurrency(investment)}</span>
        </button>
      )}
    </div>
  );
}