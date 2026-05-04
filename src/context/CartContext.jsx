import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('avc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('avc_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) { removeFromCart(productId); return; }
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const incrementQty = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (productId) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item._id === productId) {
          if (item.quantity <= 1) return null;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('avc_cart');
  };

  const isInCart    = (productId) => cartItems.some(item => item._id === productId);
  const getItemQty  = (productId) => { const item = cartItems.find(i => i._id === productId); return item ? item.quantity : 0; };
  const cartCount   = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = cartItems.length > 0 ? 150 : 0;
  const cartTotal   = cartSubtotal + deliveryCharges;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      incrementQty, decrementQty, clearCart, isInCart, getItemQty,
      cartCount, cartSubtotal, deliveryCharges, cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};