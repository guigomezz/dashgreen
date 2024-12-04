import React, { useState } from 'react';
import { Sale } from '../../types/sales';
import { EditableCell } from '../EditableCell';
import { PaymentStatus } from '../PaymentStatus';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SalesTableProps {
  sales: Sale[];
  updateSaleField: (saleId: string, field: keyof Sale, value: any) => void;
}

export function SalesTable({ sales, updateSaleField }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sales.length / itemsPerPage);

  const paginatedSales = sales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3; // Reduced for mobile
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 sm:px-3 py-1 text-sm rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="-mx-4 sm:mx-0">
      <div className="overflow-x-auto min-w-full">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Data</th>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Produtos</th>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">Valor</th>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rastreio</th>
                <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-2 sm:px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Nenhuma venda encontrada para este período
                  </td>
                </tr>
              ) : (
                paginatedSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-2 sm:px-3 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-3 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                      <EditableCell
                        value={sale.product}
                        onSave={(value) => updateSaleField(sale.id, 'product', value)}
                        type="number"
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                      <EditableCell
                        value={sale.customer}
                        onSave={(value) => updateSaleField(sale.id, 'customer', value)}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                      <EditableCell
                        value={sale.amount}
                        onSave={(value) => updateSaleField(sale.id, 'amount', value)}
                        type="number"
                        prefix="R$ "
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-300">
                      <EditableCell
                        value={sale.trackingCode || '-'}
                        onSave={(value) => updateSaleField(sale.id, 'trackingCode', value)}
                        isTrackingCode={true}
                      />
                    </td>
                    <td className="px-2 sm:px-3 py-4">
                      <PaymentStatus saleId={sale.id} status={sale.paymentStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-3 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-0">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, sales.length)} de {sales.length} resultados
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {renderPaginationButtons()}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}