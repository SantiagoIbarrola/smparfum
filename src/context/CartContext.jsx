import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, variant } = action.payload;
      const variantId = variant ? `${product.id}-${variant.size}` : product.id;
      const existingItem = state.items.find(item => item.variantId === variantId);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.variantId === variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        const price = variant ? variant.price : product.price;
        const displayName = variant 
          ? `${product.name} - Decant ${variant.size}`
          : product.name;
        
        return {
          ...state,
          items: [...state.items, {
            variantId,
            productId: product.id,
            name: displayName,
            brand: product.brand,
            price,
            image: product.image,
            variant: variant || null,
            quantity: 1
          }]
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.variantId !== action.payload)
      };
    
    case 'UPDATE_QUANTITY': {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.variantId !== variantId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.variantId === variantId
            ? { ...item, quantity }
            : item
        )
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, variant = null) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, variant } });
  };

  const removeFromCart = (variantId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: variantId });
  };

  const updateQuantity = (variantId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};