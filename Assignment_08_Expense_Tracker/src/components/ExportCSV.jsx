import React from 'react';
import { Download } from 'lucide-react';

export default function ExportCSV({ transactions }) {
  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions available to export.');
      return;
    }

    const headers = ['ID', 'Title', 'Type', 'Category', 'Amount ($)', 'Date'];
    const rows = transactions.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      t.category,
      t.amount,
      t.date
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Expense_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn btn-csv" onClick={handleExport}>
      <Download size={16} /> Export CSV
    </button>
  );
}
