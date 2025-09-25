import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Header(){
  const { items } = useContext(CartContext);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MyShop</Link>
        <nav className="flex items-center gap-4">
          <Link to="/">Products</Link>
          <Link to="/checkout" className="relative">
            Cart
            <span className="ml-2 inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
