export const fetchProducts = async (page = 1, searchTerm = "") => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?_page=${page}&_limit=20&title_like=${encodedSearchTerm}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};
