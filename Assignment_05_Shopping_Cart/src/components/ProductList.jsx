import React from 'react';
import { productsData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { Plus, Package } from 'lucide-react';

export default function ProductList() {
  const { dispatch } = useCart();

  return (
    <div>
      <h2 className="section-title">
        <Package size={22} color="#4f46e5" /> Available Tech Products
      </h2>
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <span className="product-category">{product.category}</span>
            <div className="product-footer">
              <span className="price">${product.price.toFixed(2)}</span>
              <button
                className="btn-add"
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
              >
                <Plus size={16} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
