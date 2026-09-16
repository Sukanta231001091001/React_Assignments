import React from 'react';
import { Grid, Card, Typography, Box, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function KpiWidgets({ orders }) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map((o) => o.customer)).size;
  const totalSalesCount = orders.filter((o) => o.status === 'Completed').length;

  const widgets = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      growth: '+14.2%',
      icon: <AttachMoneyIcon sx={{ fontSize: 32, color: '#6366f1' }} />,
      bg: 'rgba(99, 102, 241, 0.15)'
    },
    {
      title: 'Completed Sales',
      value: totalSalesCount.toString(),
      growth: '+8.5%',
      icon: <ShoppingBagIcon sx={{ fontSize: 32, color: '#10b981' }} />,
      bg: 'rgba(16, 185, 129, 0.15)'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      growth: '+11.8%',
      icon: <ReceiptLongIcon sx={{ fontSize: 32, color: '#3b82f6' }} />,
      bg: 'rgba(59, 130, 246, 0.15)'
    },
    {
      title: 'Active Customers',
      value: uniqueCustomers.toString(),
      growth: '+5.4%',
      icon: <PeopleAltIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
      bg: 'rgba(245, 158, 11, 0.15)'
    }
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {widgets.map((w, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Card className="metric-card">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ p: 1.2, borderRadius: 2, background: w.bg, display: 'flex' }}>
                {w.icon}
              </Box>
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: '14px !important', color: '#10b981 !important' }} />}
                label={w.growth}
                size="small"
                sx={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 700 }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 0.5 }}>
              {w.title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {w.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
