import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Tag, Check, AlertCircle, ShoppingBag } from 'lucide-react';

export default function CartSummary() {
  const {
    cart,
    appliedCoupon,
    couponError,
    subtotal,
    discountAmount,
    gstAmount,
    grandTotal,
    dispatch
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      dispatch({ type: 'APPLY_COUPON', payload: couponCodeInput });
    }
  };

  return (
    <div className="cart-panel">
      <h2 className="section-title">
        <ShoppingCart size={20} color="#4f46e5" /> Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
          <ShoppingBag size={42} style={{ marginBottom: '0.5rem', color: '#94a3b8' }} />
          <p style={{ fontWeight: 600 }}>Your cart is currently empty.</p>
          <span style={{ fontSize: '0.85rem' }}>Add some tech items to get started!</span>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4f46e5' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0 0.3rem' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="coupon-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
              <Tag size={16} color="#4f46e5" /> Apply Coupon Code
            </div>

            {appliedCoupon ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#dcfce7', color: '#166534', padding: '0.5rem 0.75rem', borderRadius: '6px', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
                  <Check size={14} /> Coupon {appliedCoupon.code} Applied ({appliedCoupon.discountPercent}% OFF)
                </span>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_COUPON' })}
                  style={{ background: 'transparent', border: 'none', color: '#166534', cursor: 'pointer', fontWeight: 700 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="coupon-input-group">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="e.g. SAVE10, WELCOME20"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                />
                <button type="submit" className="coupon-btn">Apply</button>
              </form>
            )}

            {couponError && (
              <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertCircle size={14} /> {couponError}
              </div>
            )}
          </div>

          {/* Calculations Summary */}
          <div>
            <div className="summary-line">
              <span>Items Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <div className="summary-line" style={{ color: '#166534', fontWeight: 600 }}>
                <span>Coupon Discount ({appliedCoupon.discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-line">
              <span>Estimated GST (18%)</span>
              <span>+${gstAmount.toFixed(2)}</span>
            </div>

            <div className="summary-line total">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={() => alert(`Order Placed Successfully! Total Paid: $${grandTotal.toFixed(2)}`)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
