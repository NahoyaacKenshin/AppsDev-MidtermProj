import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(items));
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  }

  // Update quantity, remove item if qty < 1
  function updateQtyToCart(productId, qty) {
    setItems(prev =>
      qty > 0
        ? prev.map(i => i.id === productId ? { ...i, qty } : i)
        : prev.filter(i => i.id !== productId)
    );
  }

  // Remove all quantities of a product
  function removeAllFromCart(productId) {
    setItems(prev => prev.filter(i => i.id !== productId));
  }

  // Remove one quantity, or remove item if qty becomes 0
  function removeFromCart(productId) {
    setItems(prev =>
      prev
        .map(i =>
          i.id === productId
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter(i => i.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQtyToCart,
        removeFromCart,
        removeAllFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };