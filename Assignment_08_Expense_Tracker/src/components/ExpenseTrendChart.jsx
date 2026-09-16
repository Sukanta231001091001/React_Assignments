import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function ExpenseTrendChart({ transactions }) {
  const expenses = transactions
    .filter((t) => t.type === 'Expense')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const dateMap = expenses.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const data = Object.keys(dateMap).map((date) => ({
    date: date.substring(5), // Short MM-DD format
    amount: dateMap[date]
  }));

  return (
    <div className="chart-card">
      <h3 className="chart-title" style={{ color: '#f472b6' }}>
        <TrendingUp size={18} /> Daily Expense Trend
      </h3>
      <div style={{ width: '100%', height: 260 }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem', color: '#94a3b8' }}>
            No expense trend data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Line type="monotone" dataKey="amount" stroke="#f472b6" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
