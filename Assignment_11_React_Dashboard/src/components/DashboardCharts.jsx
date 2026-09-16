import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';

const STATUS_COLORS = {
  Completed: '#10b981',
  Processing: '#3b82f6',
  Pending: '#f59e0b',
  Cancelled: '#ef4444'
};

export default function DashboardCharts({ orders, trendData }) {
  // Compute Order Status breakdown
  const statusCounts = orders.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, { Completed: 0, Processing: 0, Pending: 0, Cancelled: 0 });

  const pieData = Object.keys(statusCounts)
    .filter((status) => statusCounts[status] > 0)
    .map((status) => ({
      name: status,
      value: statusCounts[status]
    }));

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Revenue / Sales Trend Line Chart */}
      <Grid item xs={12} md={7}>
        <Paper className="chart-paper">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ShowChartIcon sx={{ color: '#818cf8' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Revenue / Sales Trend Over Time
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(val) => typeof val === 'number' && val > 500 ? `$${val}` : val} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#818cf8" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Sales" stroke="#34d399" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Order Status Pie Chart */}
      <Grid item xs={12} md={5}>
        <Paper className="chart-paper">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PieChartIcon sx={{ color: '#f59e0b' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Order Status Distribution
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
