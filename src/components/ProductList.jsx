
import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

export default function ProductList({ products }) {
  const { addToCart } = useContext(CartContext);
  

  if (!products.length)
    return <div className="text-center p-8">No products found.</div>;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={(prod) => addToCart(prod, 1)}
        />
      ))}
    </div>
  );
}
