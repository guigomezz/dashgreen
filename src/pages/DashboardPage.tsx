import React from 'react';
import { Header } from '../components/Header';
import { SalesProvider } from '../context/SalesContext';
import { SalesForm } from '../components/SalesForm';
import { Dashboard } from '../components/Dashboard';

export function DashboardPage() {
  return (
    <SalesProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <SalesForm />
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Dashboard />
            </div>
          </div>
        </main>
      </div>
    </SalesProvider>
  );
}