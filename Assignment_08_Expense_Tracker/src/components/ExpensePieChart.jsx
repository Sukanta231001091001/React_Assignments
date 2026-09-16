import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];

export default function ExpensePieChart({ transactions }) {
  const expenses = transactions.filter((t) => t.type === 'Expense');

  const categoryMap = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  return (
    <div className="chart-card">
      <h3 className="chart-title">
        <PieIcon size={18} /> Expenses by Category
      </h3>
      <div style={{ width: '100%', height: 260 }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem', color: '#94a3b8' }}>
            No expense data to display
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
