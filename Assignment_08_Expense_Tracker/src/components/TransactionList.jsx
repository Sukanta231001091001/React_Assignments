import React, { useState } from 'react';
import ExportCSV from './ExportCSV';
import { Search, Trash2, Filter } from 'lucide-react';

export default function TransactionList({ transactions, onDeleteTransaction }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const categories = ['ALL', ...new Set(transactions.map((t) => t.category))];

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesType = selectedType === 'ALL' || t.type === selectedType;
    return matchesSearch && matchesCat && matchesType;
  });

  return (
    <div className="panel-card">
      <div className="toolbar">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Transactions</h3>
        <ExportCSV transactions={filtered} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(11, 15, 25, 0.7)', border: '1px solid var(--border)', padding: '0.5rem 0.85rem', borderRadius: '8px', flex: 1, minWidth: '200px' }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '0.88rem' }}
          />
        </div>

        <select
          className="form-control"
          style={{ width: 'auto' }}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="Expense">Expense Only</option>
          <option value="Income">Income Only</option>
        </select>

        <select
          className="form-control"
          style={{ width: 'auto' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
          No transactions match your search/filter criteria.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="tx-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.title}</strong></td>
                  <td><span style={{ background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{t.category}</span></td>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                    {t.type === 'Income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                  </td>
                  <td>
                    <button className="btn-del" onClick={() => onDeleteTransaction(t.id)} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
