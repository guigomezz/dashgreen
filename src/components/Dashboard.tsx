import React, { useState, useMemo } from 'react';
import { useSales } from '../context/SalesContext';
import { DateFilter } from './DateFilter';
import { DashboardMetrics } from './dashboard/DashboardMetrics';
import { SalesTable } from './dashboard/SalesTable';
import { SearchBar } from './SearchBar';
import { dateFilters } from '../utils/dateFilters';

export function Dashboard() {
  const { filteredSales, dateFilter, setDateFilter, updateSaleField, updateDailyInvestment, getDailyInvestment } = useSales();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDateFilter('all');
  };

  // Get the current period's investment
  const currentInvestment = useMemo(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      return getDailyInvestment(dateString);
    }

    // For predefined filters, calculate total investment for the period
    if (dateFilter !== 'all') {
      const filterDate = dateFilters[dateFilter]?.();
      if (filterDate) {
        let totalInvestment = 0;
        const today = new Date();
        let currentDate = new Date(filterDate);

        while (currentDate <= today) {
          const dateStr = currentDate.toISOString().split('T')[0];
          totalInvestment += getDailyInvestment(dateStr);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return totalInvestment;
      }
    }

    // For "all" filter, sum up all investments
    return Object.values(filteredSales.reduce((acc: { [key: string]: number }, sale) => {
      const dateStr = new Date(sale.date).toISOString().split('T')[0];
      acc[dateStr] = getDailyInvestment(dateStr);
      return acc;
    }, {})).reduce((sum, inv) => sum + inv, 0);
  }, [dateFilter, selectedDate, getDailyInvestment, filteredSales]);

  // Filter sales based on selected date or date filter
  const displayedSales = selectedDate
    ? filteredSales.filter(sale => {
        const saleDate = new Date(sale.date);
        const compareDate = new Date(selectedDate);
        return (
          saleDate.getDate() === compareDate.getDate() &&
          saleDate.getMonth() === compareDate.getMonth() &&
          saleDate.getFullYear() === compareDate.getFullYear()
        );
      })
    : filteredSales;

  // Filter out unpaid sales for metrics calculation
  const validSales = displayedSales.filter(sale => sale.paymentStatus !== 'unpaid');

  // Filter sales by search term
  const searchedSales = searchTerm
    ? displayedSales.filter(sale =>
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : displayedSales;

  return (
    <div className="space-y-4 sm:space-y-6">
      <DateFilter 
        selectedFilter={dateFilter} 
        onFilterChange={(filter) => {
          setDateFilter(filter);
          setSelectedDate(null);
        }}
        startDate={selectedDate || undefined}
        onDateChange={handleDateChange}
        selectedDateInvestment={currentInvestment}
        onInvestmentChange={updateDailyInvestment}
      />

      <DashboardMetrics
        totalSales={validSales.reduce((sum, sale) => sum + sale.amount, 0)}
        totalInvestment={currentInvestment}
        totalCustomers={new Set(validSales.map(sale => sale.customer)).size}
        totalProducts={validSales.reduce((sum, sale) => sum + sale.product, 0)}
        paidSales={validSales.reduce((sum, sale) => 
          sale.paymentStatus === 'paid' ? sum + sale.amount : sum, 0
        )}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedDate 
                  ? `Vendas em ${selectedDate.toLocaleDateString()}`
                  : dateFilter === 'all' 
                    ? 'Todas as Vendas'
                    : 'Vendas Filtradas'}
              </h2>
            </div>
            <div className="w-full sm:w-64">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>
        </div>
        <SalesTable 
          sales={searchedSales} 
          updateSaleField={updateSaleField}
        />
      </div>
    </div>
  );
}