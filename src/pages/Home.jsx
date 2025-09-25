import React from "react";
import useProducts from "../hooks/useProducts";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

export default function Home() {
  const {
    products,
    loading,
    error,
    query,
    setQuery,
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
  } = useProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <Filters
        query={query}
        setQuery={setQuery}
        categories={categories}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Product list + pagination */}
      <div className="md:col-span-3">
        <ProductList products={products} loading={loading} error={error} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
