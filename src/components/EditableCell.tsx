import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { Toast } from './Toast';

interface EditableCellProps {
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number';
  prefix?: string;
  isTrackingCode?: boolean;
}

export function EditableCell({ value, onSave, type = 'text', prefix, isTrackingCode = false }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    const finalValue = type === 'number' ? Number(editValue) : editValue;
    onSave(finalValue);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.toString());
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const displayValue = type === 'number' && prefix === 'R$ ' 
    ? formatCurrency(Number(value))
    : `${prefix || ''}${value}`;

  if (isTrackingCode) {
    return (
      <>
        <button
          onClick={handleCopy}
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="Clique para copiar"
        >
          {value || '-'}
        </button>
        {showToast && (
          <Toast 
            message="Código copiado!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </>
    );
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-24 px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          min={type === 'number' ? "0" : undefined}
          step={type === 'number' ? "0.01" : undefined}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setIsEditing(false);
          }}
        />
        <button
          onClick={handleSave}
          className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {displayValue}
    </button>
  );
}