import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../api/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(page);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ProductList products={products} />}
      <div>
        <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
