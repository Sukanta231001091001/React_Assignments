# Assignment 08 — Expense Tracker

A responsive Expense Tracker SPA built using React, Recharts, and LocalStorage for recording, managing, categorizing, and analyzing income and expenses.

## Requirements Implemented
- **Add Expense / Income**: Controlled form with field validation.
- **Delete Expense**: Instant deletion of transaction records.
- **Monthly Summary**: Real-time KPI cards for Net Balance, Income Total, and Expenses Total.
- **Category Filter & Search**: Filter transactions by type, category, or title keyword.
- **Recharts Data Visualization**:
  1. **Pie Chart**: Expenses by category (`ExpensePieChart.jsx`).
  2. **Bar Chart**: Income vs Expense breakdown (`IncomeExpenseBarChart.jsx`).
  3. **Line Chart**: Daily expense trend (`ExpenseTrendChart.jsx`).
- **Export CSV**: Instant native browser download generating a `.csv` file containing active transaction rows (`ExportCSV.jsx`).
- **Data Persistence**: Synced with LocalStorage.

## Technologies Used
- React 18
- Vite
- Recharts (Charts library)
- Lucide React (Icons)
- LocalStorage API

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
