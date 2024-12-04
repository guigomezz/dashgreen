import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Sale, SaleFormData } from '../types/sales';
import { dateFilters } from '../utils/dateFilters';

interface SalesContextType {
  sales: Sale[];
  filteredSales: Sale[];
  addSale: (sale: SaleFormData) => void;
  updatePaymentStatus: (saleId: string, status: 'paid' | 'pending' | 'unpaid') => void;
  updateDailyInvestment: (date: string, investment: number) => void;
  getDailyInvestment: (date: string) => number;
  updateSaleField: (saleId: string, field: keyof Sale, value: any) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

const STORAGE_KEY = 'dashgreen_sales';
const INVESTMENTS_KEY = 'dashgreen_investments';
const DATE_FILTER_KEY = 'dashgreen_date_filter';

interface DailyInvestments {
  [date: string]: number;
}

export function SalesProvider({ children }: { children: ReactNode }) {
  // Initialize sales from localStorage
  const [sales, setSales] = useState<Sale[]>(() => {
    try {
      const savedSales = localStorage.getItem(STORAGE_KEY);
      return savedSales ? JSON.parse(savedSales) : [];
    } catch (error) {
      console.error('Error loading sales:', error);
      return [];
    }
  });

  // Initialize investments from localStorage
  const [dailyInvestments, setDailyInvestments] = useState<DailyInvestments>(() => {
    try {
      const savedInvestments = localStorage.getItem(INVESTMENTS_KEY);
      return savedInvestments ? JSON.parse(savedInvestments) : {};
    } catch (error) {
      console.error('Error loading investments:', error);
      return {};
    }
  });

  // Initialize dateFilter from localStorage
  const [dateFilter, setDateFilter] = useState<string>(() => {
    try {
      const savedFilter = localStorage.getItem(DATE_FILTER_KEY);
      return savedFilter || 'all';
    } catch (error) {
      console.error('Error loading date filter:', error);
      return 'all';
    }
  });

  // Persist sales data whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    } catch (error) {
      console.error('Error saving sales:', error);
    }
  }, [sales]);

  // Persist daily investments
  useEffect(() => {
    try {
      localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(dailyInvestments));
    } catch (error) {
      console.error('Error saving investments:', error);
    }
  }, [dailyInvestments]);

  // Persist date filter
  useEffect(() => {
    try {
      localStorage.setItem(DATE_FILTER_KEY, dateFilter);
    } catch (error) {
      console.error('Error saving date filter:', error);
    }
  }, [dateFilter]);

  const addSale = (saleData: SaleFormData) => {
    const newSale: Sale = {
      id: crypto.randomUUID(),
      date: saleData.date.toISOString(),
      amount: saleData.amount,
      product: saleData.product,
      customer: saleData.customer,
      trackingCode: saleData.trackingCode,
      paymentStatus: saleData.paymentStatus,
    };

    setSales((prev) => [...prev, newSale].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const updatePaymentStatus = (saleId: string, status: 'paid' | 'pending' | 'unpaid') => {
    setSales((prev) => prev.map((sale) => 
      sale.id === saleId ? { ...sale, paymentStatus: status } : sale
    ));
  };

  const updateDailyInvestment = (date: string, investment: number) => {
    setDailyInvestments(prev => ({
      ...prev,
      [date]: investment
    }));
  };

  const getDailyInvestment = (date: string): number => {
    return dailyInvestments[date] || 0;
  };

  const updateSaleField = (saleId: string, field: keyof Sale, value: any) => {
    setSales((prev) => prev.map((sale) =>
      sale.id === saleId ? { ...sale, [field]: value } : sale
    ));
  };

  const filteredSales = useMemo(() => {
    if (dateFilter === 'all') return sales;

    const filterDate = dateFilters[dateFilter as keyof typeof dateFilters]?.();
    if (!filterDate) return sales;

    return sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      saleDate.setHours(0, 0, 0, 0);
      filterDate.setHours(0, 0, 0, 0);
      return saleDate >= filterDate;
    });
  }, [sales, dateFilter]);

  return (
    <SalesContext.Provider value={{ 
      sales, 
      filteredSales,
      addSale,
      updatePaymentStatus,
      updateDailyInvestment,
      getDailyInvestment,
      updateSaleField,
      dateFilter, 
      setDateFilter 
    }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
}