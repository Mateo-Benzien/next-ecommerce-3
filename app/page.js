"use client"; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { fetchProducts } from './api/api';
import ProductList from './components/ProductList';
import './styles.css'; // Import global styles

// Debounce function to limit the number of API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts(page, searchTerm); // Pass search term
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, searchTerm]); // Re-fetch when page or search term changes

  const handleSearch = debounce((value) => {
    console.log("Search term:", value); // Debugging line
    setSearchTerm(value); // Update search term
  }, 300); // Debounce for 300ms

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Welcome to the E-commerce Site</h1>
      <p>Explore our products!</p>
      
      {/* Search bar */}
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)} // Update search term
          className="searchInput"
          value={searchTerm}
        />
        {searchTerm && (
          <button onClick={clearSearch} className="clearButton">X</button>
        )}
      </div>

      <div className="product-grid">
        <ProductList products={products} />
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}
