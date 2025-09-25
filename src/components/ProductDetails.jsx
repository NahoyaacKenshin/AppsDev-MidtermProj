import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetails = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Product Image */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-64 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">Brand: {product.brand}</p>
            <p className="text-lg font-semibold">Category: {product.category}</p>
            <p className="text-xl font-bold text-green-600">${product.price}</p>
            <p className="text-sm text-gray-500">
              In Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>

            {/* Add to Cart */}
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
              className={`px-4 py-2 rounded text-white ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
