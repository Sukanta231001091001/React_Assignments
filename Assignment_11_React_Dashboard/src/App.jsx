import React, { useState } from 'react';
import KpiWidgets from './components/KpiWidgets';
import DashboardCharts from './components/DashboardCharts';
import FilterControls from './components/FilterControls';
import RecentOrdersTable from './components/RecentOrdersTable';
import { initialOrders, revenueTrendData } from './data/mockDashboardData';
import { BarChart2 } from 'lucide-react';

export default function App() {
  const [orders] = useState(initialOrders);
  const [dateRange, setDateRange] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  const categories = [...new Set(orders.map((o) => o.category))];

  // Filter orders based on user selections
  const filteredOrders = orders.filter((o) => {
    const matchesCategory = category === 'ALL' || o.category === category;
    const matchesStatus = status === 'ALL' || o.status === status;

    let matchesDate = true;
    if (dateRange === 'LAST_7') {
      matchesDate = new Date(o.date) >= new Date('2026-09-10');
    } else if (dateRange === 'LAST_30') {
      matchesDate = new Date(o.date) >= new Date('2026-08-16');
    }

    return matchesCategory && matchesStatus && matchesDate;
  });

  return (
    <div className="dashboard-app">
      <header className="header">
        <div className="brand">
          <BarChart2 size={28} />
          <span>OmniAnalytics — Order Management Dashboard</span>
        </div>
      </header>

      <main className="container">
        {/* KPI Widgets */}
        <KpiWidgets orders={filteredOrders} />

        {/* Filter Controls Bar */}
        <FilterControls
          dateRange={dateRange}
          setDateRange={setDateRange}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          categories={categories}
        />

        {/* Graphical Line & Pie Charts */}
        <DashboardCharts orders={filteredOrders} trendData={revenueTrendData} />

        {/* Recent Orders Table */}
        <RecentOrdersTable orders={filteredOrders} />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} OmniAnalytics Dashboard. Built with React, Material UI & Recharts.</p>
      </footer>
    </div>
  );
}
