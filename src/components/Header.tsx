import React from 'react';
import { LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm mb-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">DASHGREEN</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Olá, {user?.username}</span>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
                )}
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LayoutDashboard 
                  strokeWidth={2}
                  className="w-5 h-5 text-gray-900 dark:text-white" 
                />
              </button>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}