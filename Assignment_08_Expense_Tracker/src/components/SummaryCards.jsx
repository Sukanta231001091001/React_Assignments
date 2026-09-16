import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
          <Wallet size={24} />
        </div>
        <div>
          <div className="summary-val">${netBalance.toFixed(2)}</div>
          <div className="summary-lbl">Net Total Balance</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
          <TrendingUp size={24} />
        </div>
        <div>
          <div className="summary-val" style={{ color: '#34d399' }}>+${totalIncome.toFixed(2)}</div>
          <div className="summary-lbl">Total Monthly Income</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
          <TrendingDown size={24} />
        </div>
        <div>
          <div className="summary-val" style={{ color: '#f87171' }}>-${totalExpense.toFixed(2)}</div>
          <div className="summary-lbl">Total Monthly Expenses</div>
        </div>
      </div>
    </div>
  );
}
