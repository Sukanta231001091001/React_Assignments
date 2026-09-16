import React, { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import ExpensePieChart from './components/ExpensePieChart';
import IncomeExpenseBarChart from './components/IncomeExpenseBarChart';
import ExpenseTrendChart from './components/ExpenseTrendChart';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import { initialTransactions } from './data/initialTransactions';
import { Wallet } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expense_tracker_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem('expense_tracker_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="tracker-wrapper">
      <header className="header">
        <div className="brand">
          <Wallet size={28} />
          <span>Financial Tracker Pro</span>
        </div>
      </header>

      <main className="main-container">
        {/* Top Summary KPI Cards */}
        <SummaryCards transactions={transactions} />

        {/* 3 Interactive Recharts */}
        <div className="charts-grid">
          <ExpensePieChart transactions={transactions} />
          <IncomeExpenseBarChart transactions={transactions} />
          <ExpenseTrendChart transactions={transactions} />
        </div>

        {/* Content Layout: Form & List */}
        <div className="content-layout">
          <AddTransaction onAddTransaction={handleAddTransaction} />
          <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Financial Tracker Pro. Built with React, Recharts & LocalStorage.</p>
      </footer>
    </div>
  );
}
