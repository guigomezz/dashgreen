export interface Sale {
  id: string;
  date: string;
  amount: number;
  product: number;
  customer: string;
  trackingCode?: string;
  paymentStatus: 'paid' | 'pending' | 'unpaid';
}

export interface SaleFormData {
  amount: number;
  product: number;
  customer: string;
  trackingCode?: string;
  date: Date;
  paymentStatus: 'paid' | 'pending' | 'unpaid';
}