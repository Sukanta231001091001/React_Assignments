import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

export default function Header() {
  const { totalItemsCount } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <ShoppingBag size={28} />
          <span>TechStore Online</span>
        </div>

        <button className="cart-icon-btn">
          <ShoppingCart size={20} />
          <span>Cart</span>
          <span className="badge">{totalItemsCount}</span>
        </button>
      </div>
    </header>
  );
}
