import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <div className="cart-app">
        <Header />
        <main className="main-layout">
          <ProductList />
          <CartSummary />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
