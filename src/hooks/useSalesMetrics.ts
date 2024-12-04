import { useMemo } from 'react';
import { Sale } from '../types/sales';

export function useSalesMetrics(sales: Sale[]) {
  const metrics = useMemo(() => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalInvestment = sales.reduce((sum, sale) => sum + sale.investment, 0);
    const totalCustomers = new Set(sales.map(sale => sale.customer)).size;
    const totalProducts = sales.reduce((sum, sale) => sum + sale.product, 0);
    const profit = totalSales - totalInvestment;

    return {
      totalSales,
      totalInvestment,
      totalCustomers,
      totalProducts,
      profit,
    };
  }, [sales]);

  return metrics;
}