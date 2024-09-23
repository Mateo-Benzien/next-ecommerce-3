import { useEffect, useState } from 'react';
import { fetchProductById } from '../../api/api';

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-info">
    <h1>{product.title}</h1>
    <p className="price">${product.price.toFixed(2)}</p>
    <p className="category">{product.category}</p>
    <p className="description">{product.description}</p>
    {product.tags && <p className="tags">Tags: {product.tags.join(', ')}</p>}
    <p className="rating">Rating: {product.rating} / 5</p>
    <p className="stock">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
  </div>
  );
}
