# Assignment 05 — Online Shopping Cart

An Online Shopping Cart application built using React demonstrating State Management via `useReducer` and `Context API`.

## Features Implemented
- **Product List**: Interactive showcase of tech products with images, titles, and instant add-to-cart controls.
- **State Management**: Built with `CartContext` and `cartReducer` enforcing pure state updates.
- **Cart Actions**: Supports `ADD_TO_CART`, `REMOVE_FROM_CART`, `INCREASE_QUANTITY`, `DECREASE_QUANTITY`, `CLEAR_CART`, `APPLY_COUPON`, and `REMOVE_COUPON`.
- **Coupon Code System**: Validates discount coupons (e.g. `SAVE10` = 10% off, `WELCOME20` = 20% off, `SUPER30` = 30% off) with percentage price reductions and invalid coupon error feedback.
- **Tax & Price Breakdown**: Real-time computation of Items Subtotal, Coupon Discount, GST (18%), and Grand Total.
- **Empty Cart Handling**: Friendly state layout when zero items are present.

## Installation & Running
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
