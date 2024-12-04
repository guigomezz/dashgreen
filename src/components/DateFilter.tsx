import React from 'react';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { DailyInvestment } from './DailyInvestment';
import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  startDate?: Date;
  onDateChange?: (date: Date) => void;
  selectedDateInvestment?: number;
  onInvestmentChange?: (date: string, value: number) => void;
}

export function DateFilter({ 
  selectedFilter, 
  onFilterChange, 
  startDate, 
  onDateChange,
  selectedDateInvestment,
  onInvestmentChange 
}: DateFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600 dark:text-blue-400 w-5 h-5" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Filtrar por Período</h3>
        </div>
        {startDate && onInvestmentChange && (
          <div className="w-full sm:w-auto border-t sm:border-l border-gray-200 dark:border-gray-700 pt-2 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
            <DailyInvestment
              date={startDate.toISOString().split('T')[0]}
              investment={selectedDateInvestment || 0}
              onInvestmentChange={onInvestmentChange}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-3 sm:mt-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todo Período' },
            { id: 'today', label: 'Hoje' },
            { id: 'yesterday', label: 'Ontem' },
            { id: 'last7Days', label: 'Últimos 7 dias' },
            { id: 'last30Days', label: 'Últimos 30 dias' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {onDateChange && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">ou selecione uma data:</span>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => onDateChange(date)}
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
            />
          </div>
        )}
      </div>
    </div>
  );
}