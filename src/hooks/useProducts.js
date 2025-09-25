import { useEffect, useState, useMemo } from "react";

export default function useProducts() {
  const [baseProducts, setBaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search handling
  const [searchInput, setSearchInput] = useState(""); // what user types
  const [query, setQuery] = useState(""); // confirmed search

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Price range
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        const products = data.products || [];
        setBaseProducts(products);

        // set initial price range
        const prices = products.map((p) => p.price || 0);
        const max = Math.max(...prices, 100);
        setPriceRange([0, max]);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Categories
  const categories = useMemo(() => {
    const cats = new Set(baseProducts.map((p) => p.category));
    return Array.from(cats).sort();
  }, [baseProducts]);

  // Suggestions for dropdown
  const suggestions = useMemo(() => {
    if (!searchInput.trim()) return [];
    const q = searchInput.toLowerCase();
    return baseProducts
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 5); // limit suggestions
  }, [searchInput, baseProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let list = (baseProducts || []).slice();

    // Category
    if (category && category !== "all") {
      list = list.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    //  Query
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Price filter
    const [minPrice, maxPrice] = priceRange;
    list = list.filter(
      (p) =>
        typeof p.price === "number" &&
        p.price >= (minPrice || 0) &&
        p.price <= (maxPrice || Infinity)
    );

    // Sorting
    if (sortBy === "price-asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "price-desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [baseProducts, category, query, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return {
    products: paginatedProducts,
    loading,
    error,

    // Search handling
    searchInput,
    setSearchInput,
    query,
    setQuery,
    suggestions,

    category,
    setCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    categories,

    currentPage,
    setCurrentPage,
    totalPages,
  };
}

