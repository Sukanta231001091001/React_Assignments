import React from 'react';
import {
  Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function RecentOrdersTable({ orders }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Processing': return 'status-processing';
      case 'Pending': return 'status-pending';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <Paper className="chart-paper">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ShoppingCartIcon sx={{ color: '#818cf8' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Recent Orders Directory
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Typography sx={{ color: '#94a3b8', textAlign: 'center', py: 4 }}>
          No orders match the selected filters.
        </Typography>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ 'th': { color: '#94a3b8', fontWeight: 700, borderColor: 'rgba(255,255,255,0.08)' } }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status Indicator</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.id} sx={{ 'td': { borderColor: 'rgba(255,255,255,0.06)', color: '#f8fafc' } }}>
                  <TableCell sx={{ fontWeight: 700, color: '#818cf8 !important' }}>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>${row.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      className={`status-chip ${getStatusClass(row.status)}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
