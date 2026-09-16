export const initialState = {
  cart: [],
  appliedCoupon: null, // { code: 'SAVE10', discountPercent: 10 }
  couponError: null
};

export const validCoupons = {
  "SAVE10": 10,
  "WELCOME20": 20,
  "SUPER30": 30
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        appliedCoupon: null,
        couponError: null
      };

    case 'APPLY_COUPON': {
      const code = action.payload.trim().toUpperCase();
      if (validCoupons[code]) {
        return {
          ...state,
          appliedCoupon: { code, discountPercent: validCoupons[code] },
          couponError: null
        };
      } else {
        return {
          ...state,
          couponError: `Invalid Coupon "${code}". Try SAVE10, WELCOME20, or SUPER30.`
        };
      }
    }

    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
        couponError: null
      };

    default:
      return state;
  }
}
