import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function IncomeExpenseBarChart({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const data = [
    {
      name: 'Monthly Overview',
      Income: totalIncome,
      Expense: totalExpense
    }
  ];

  return (
    <div className="chart-card">
      <h3 className="chart-title" style={{ color: '#38bdf8' }}>
        <BarChart3 size={18} /> Income vs Expense Breakdown
      </h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            <Legend />
            <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
