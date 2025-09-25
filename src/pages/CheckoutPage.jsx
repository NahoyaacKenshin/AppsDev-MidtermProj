import React, { useContext, useRef } from 'react';
import { CartContext } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, total, clearCart, removeAllFromCart, updateQtyToCart } = useContext(CartContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  // Decrease quantity by 1
  const handleDecrease = (id, qty) => {
    if (qty > 1 && typeof updateQtyToCart === 'function') {
      updateQtyToCart(id, qty - 1);
    }
  };

  // Increase quantity by 1
  const handleIncrease = (id, qty) => {
    if (typeof updateQtyToCart === 'function') {
      updateQtyToCart(id, qty + 1);
    }
  };

  // Remove all quantities of a product
  const handleRemoveAll = (id) => {
    if (typeof removeAllFromCart === 'function') {
      removeAllFromCart(id);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    alert('Order placed! — order total: $' + total.toFixed(2));
    clearCart();
    // Clear input fields
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (addressRef.current) addressRef.current.value = '';
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Full name</label>
            <input ref={nameRef} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input ref={emailRef} type="email" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Address</label>
            <input ref={addressRef} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <h3 className="font-medium">Order Summary</h3>
            {items.length === 0 && (
              <div className="text-gray-500 text-sm py-2">Your cart is empty.</div>
            )}
            {items.map(i => (
              <div key={i.id} className="flex justify-between items-center text-sm py-1 gap-2">
                <div className="flex-1 flex items-center gap-2">
                  {i.title}
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      type="button"
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() => handleDecrease(i.id, i.qty)}
                      disabled={i.qty <= 1}
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-2">{i.qty}</span>
                    <button
                      type="button"
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 hover:cursor-pointer"
                      onClick={() => handleIncrease(i.id, i.qty)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <span>${(i.price * i.qty).toFixed(2)}</span>
                <button
                  type="button"
                  className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded hover:bg-red-300 hover:cursor-pointer"
                  onClick={() => handleRemoveAll(i.id)}
                  title="Remove all"
                >
                  Remove All
                </button>
              </div>
            ))}
            <div className="font-bold pt-2">Total: ${total.toFixed(2)}</div>
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer" disabled={items.length === 0}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}