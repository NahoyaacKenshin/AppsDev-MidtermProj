import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { CartContext } from '../context/CartContext';

export default function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchProductById(id);
        if (mounted) setProduct(res);
      } catch (e) { if (mounted) setError(e.message); }
      finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6">
      <div>
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="w-full h-96 object-cover rounded" />
        <div className="mt-2 flex gap-2">
          {product.images?.slice(0,4).map((img, idx) => <img key={idx} src={img} alt="" className="h-20 w-20 object-cover rounded" />)}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4">
          <div className="text-xl font-semibold">${product.price.toFixed(2)} <span className="text-sm text-gray-500 line-through ml-2">${(product.price/(1-product.discountPercentage/100)).toFixed(2)}</span></div>
          <div className="text-sm text-gray-600">Rating: {product.rating}</div>
          <div className="text-sm text-gray-600">Stock: {product.stock}</div>
          <div className="mt-4">
            <button onClick={() => addToCart(product, 1)} className="px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium">Reviews</h3>
          {product.reviews?.length ? (
            product.reviews.map((r, i) => (
              <div key={i} className="mt-2 p-2 border rounded">
                <div className="text-sm font-semibold">{r.reviewerName} — {r.rating}/5</div>
                <div className="text-xs text-gray-600">{new Date(r.date).toLocaleDateString()}</div>
                <div className="mt-1">{r.comment}</div>
              </div>
            ))
          ) : <div className="text-sm text-gray-500">No reviews</div>}
        </div>
      </div>
    </div>
  );
}
