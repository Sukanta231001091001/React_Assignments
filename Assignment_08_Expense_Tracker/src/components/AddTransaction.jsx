import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AddTransaction({ onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const categories = {
    Expense: ['Food', 'Housing', 'Utilities', 'Entertainment', 'Transport', 'Technology', 'Healthcare', 'Other'],
    Income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert('Please enter a valid title and positive dollar amount.');
      return;
    }

    const newTx = {
      id: `TX-${Math.floor(100 + Math.random() * 900)}`,
      title,
      amount: Number(amount),
      type,
      category,
      date
    };

    onAddTransaction(newTx);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="panel-card">
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <PlusCircle size={20} color="#6366f1" /> Add New Transaction
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction Title *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Grocery Shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount ($) *</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => {
                const newType = e.target.value;
                setType(newType);
                setCategory(categories[newType][0]);
              }}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories[type].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          Add Transaction
        </button>
      </form>
    </div>
  );
}
