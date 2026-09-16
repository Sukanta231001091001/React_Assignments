import React from 'react';
import { Paper, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterControls({
  dateRange,
  setDateRange,
  category,
  setCategory,
  status,
  setStatus,
  categories
}) {
  return (
    <Paper className="chart-paper" sx={{ mb: 3, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FilterListIcon sx={{ color: '#818cf8' }} />
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>Filter Dashboard Metrics</span>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small" sx={{ background: 'rgba(11,14,20,0.6)' }}>
            <InputLabel sx={{ color: '#94a3b8' }}>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => setDateRange(e.target.value)}
              sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="ALL">All Time</MenuItem>
              <MenuItem value="LAST_7">Last 7 Days</MenuItem>
              <MenuItem value="LAST_30">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small" sx={{ background: 'rgba(11,14,20,0.6)' }}>
            <InputLabel sx={{ color: '#94a3b8' }}>Product Category</InputLabel>
            <Select
              value={category}
              label="Product Category"
              onChange={(e) => setCategory(e.target.value)}
              sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="ALL">All Categories</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small" sx={{ background: 'rgba(11,14,20,0.6)' }}>
            <InputLabel sx={{ color: '#94a3b8' }}>Order Status</InputLabel>
            <Select
              value={status}
              label="Order Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="ALL">All Statuses</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
