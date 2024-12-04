import React from 'react';
import { TrendingUp, Users, Package, DollarSign, Percent } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface DashboardMetricsProps {
  totalSales: number;
  totalInvestment: number;
  totalCustomers: number;
  totalProducts: number;
  paidSales: number;
}

export function DashboardMetrics({ 
  totalSales, 
  totalInvestment, 
  totalCustomers, 
  totalProducts,
  paidSales
}: DashboardMetricsProps) {
  const calculateROI = () => {
    if (totalInvestment <= 0) return 0;
    // Only consider paid and pending sales for ROI calculation
    const validSales = totalSales;
    return ((validSales - totalInvestment) / totalInvestment) * 100;
  };

  const roi = calculateROI();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full flex-shrink-0">
            <TrendingUp className="text-blue-600 dark:text-blue-300 w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">Vendas</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {formatCurrency(totalSales)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full flex-shrink-0">
            <DollarSign className="text-red-600 dark:text-red-300 w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">Investimento</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {formatCurrency(totalInvestment)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full flex-shrink-0">
            <Percent className="text-purple-600 dark:text-purple-300 w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">ROI</p>
            <p className={`text-sm font-semibold truncate ${
              roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {formatPercent(roi)}%
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full flex-shrink-0">
            <Users className="text-green-600 dark:text-green-300 w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">Clientes</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {totalCustomers}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full flex-shrink-0">
            <Package className="text-yellow-600 dark:text-yellow-300 w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-600 dark:text-gray-400">Produtos</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {totalProducts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}