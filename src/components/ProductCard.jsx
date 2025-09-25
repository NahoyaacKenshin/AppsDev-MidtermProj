import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
    const handleAdd = () => {
    alert(`Added "${product.title}" to cart!`);
    if (onAdd) onAdd(product);
  };
  return (
    <div className="bg-white p-4 rounded shadow">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="h-40 w-full object-cover rounded" />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
      </Link>
      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
          <div className="text-xs text-gray-500">Rating: {product.rating}</div>
        </div>
       <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}
