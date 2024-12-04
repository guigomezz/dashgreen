import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Sale } from '../types/sales';
import { formatCurrency } from '../utils/formatters';

interface SalesChartProps {
  sales: Sale[];
}

export function SalesChart({ sales }: SalesChartProps) {
  const chartData = useMemo(() => {
    const groupedData = sales.reduce((acc: { [key: string]: any }, sale) => {
      const date = new Date(sale.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          vendas: 0,
          investimento: 0,
          lucro: 0,
        };
      }
      acc[date].vendas += sale.amount;
      acc[date].investimento += sale.investment;
      acc[date].lucro += (sale.amount - sale.investment);
      return acc;
    }, {});

    return Object.values(groupedData).sort((a, b) => 
      new Date(a.date.split('/').reverse().join('-')).getTime() - 
      new Date(b.date.split('/').reverse().join('-')).getTime()
    );
  }, [sales]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p
              key={entry.name}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey="date"
          className="text-gray-600 dark:text-gray-400"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          className="text-gray-600 dark:text-gray-400"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => formatCurrency(value)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="vendas"
          name="Vendas"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#colorVendas)"
          dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }}
          activeDot={{ stroke: '#3b82f6', strokeWidth: 2, r: 6, fill: '#fff' }}
        />
        <Area
          type="monotone"
          dataKey="investimento"
          name="Investimento"
          stroke="#ef4444"
          strokeWidth={3}
          fill="url(#colorInvestimento)"
          dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4, fill: '#fff' }}
          activeDot={{ stroke: '#ef4444', strokeWidth: 2, r: 6, fill: '#fff' }}
        />
        <Area
          type="monotone"
          dataKey="lucro"
          name="Lucro"
          stroke="#22c55e"
          strokeWidth={3}
          fill="url(#colorLucro)"
          dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: '#fff' }}
          activeDot={{ stroke: '#22c55e', strokeWidth: 2, r: 6, fill: '#fff' }}
        />
        <defs>
          <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorInvestimento" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}