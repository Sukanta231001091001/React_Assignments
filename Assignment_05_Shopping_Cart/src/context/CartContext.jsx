import React, { createContext, useContext, useReducer } from 'react';
import { cartReducer, initialState } from '../reducers/cartReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Financial calculations
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = state.appliedCoupon
    ? (subtotal * state.appliedCoupon.discountPercent) / 100
    : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = (discountedSubtotal * 18) / 100; // 18% GST calculation
  const grandTotal = discountedSubtotal + gstAmount;

  const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart: state.cart,
    appliedCoupon: state.appliedCoupon,
    couponError: state.couponError,
    subtotal,
    discountAmount,
    gstAmount,
    grandTotal,
    totalItemsCount,
    dispatch
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
