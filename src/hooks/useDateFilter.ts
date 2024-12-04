import { useState } from 'react';
import { Sale } from '../types/sales';
import { dateFilters } from '../utils/dateFilters';

export function useDateFilter(sales: Sale[]) {
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredSales = selectedDate
    ? sales.filter(sale => {
        const saleDate = new Date(sale.date);
        const compareDate = new Date(selectedDate);
        return (
          saleDate.getDate() === compareDate.getDate() &&
          saleDate.getMonth() === compareDate.getMonth() &&
          saleDate.getFullYear() === compareDate.getFullYear()
        );
      })
    : dateFilter === 'all'
    ? sales
    : sales.filter(sale => {
        const filterDate = dateFilters[dateFilter as keyof typeof dateFilters]?.();
        if (!filterDate) return true;
        const saleDate = new Date(sale.date);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate >= filterDate;
      });

  return {
    dateFilter,
    setDateFilter,
    selectedDate,
    setSelectedDate,
    filteredSales,
  };
}