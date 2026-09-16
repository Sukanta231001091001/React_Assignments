# Assignment 11 — React Analytics Dashboard

A SaaS order-management analytics dashboard built using React, Material UI (`@mui/material`), and Recharts.

## Widgets & Components Implemented
- **KPI Summary Widgets**:
  - **Revenue**: Total earnings computation with growth indicators.
  - **Sales**: Completed order volume metric.
  - **Orders**: Total order count breakdown.
  - **Customers**: Unique active customer count.
- **Graphical Displays (Recharts)**:
  - **Revenue / Sales Trend**: Line Chart tracking metrics over time.
  - **Order Status Distribution**: Pie Chart displaying status proportions with colored indicators:
    - `Completed` (Green)
    - `Processing` (Blue)
    - `Pending` (Amber)
    - `Cancelled` (Red)
- **Recent Orders Table**: Material UI styled table rendering customer, category, date, price, and status chips.
- **Filter Controls**: Multi-axis filtering by Date Range, Product Category, and Order Status.

## Technologies Used
- React 18
- Vite
- Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- Recharts (Charts library)

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
