import React, { useState, useEffect, useRef } from "react";

export default function Filters({
  query,          
  setQuery,        
  categories,
  category,
  setCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
}) {
  const [searchInput, setSearchInput] = useState(query || "");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  // Normalize categories → always strings & unique
  const normalizedCategories = [
    ...new Set((categories || []).map((c) => (typeof c === "string" ? c : c?.name)))
  ];

  // Fetch products once (for typeahead suggestions).
  useEffect(() => {
    let cancelled = false;
    fetch("https://dummyjson.com/products?limit=100")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setAllProducts(data.products || []);
      })
      .catch(() => {
        if (cancelled) return;
        setAllProducts([]);
      });
    return () => { cancelled = true; };
  }, []);

  // Keep local input in sync when parent query changes externally (e.g., cleared)
  useEffect(() => {
    setSearchInput(query || "");
  }, [query]);

  // Build suggestions from the local input, but do NOT call setQuery here
  useEffect(() => {
    const value = (searchInput || "").trim();
    if (value.length > 1) {
      const lower = value.toLowerCase();
      const matches = allProducts.filter((p) => p.title.toLowerCase().includes(lower));
      setSuggestions(matches.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [searchInput, allProducts]);

  // Confirm search (called on Enter / clicking suggestion / clicking Go)
  const confirmSearch = (term) => {
    const safeTerm = (term || "").trim();
    setSearchInput(safeTerm);
    setSuggestions([]);

    // when cleared, ensure parent gets empty query to show all products
    setQuery(safeTerm);
  };

  // hide suggestions on outside click
  useEffect(() => {
    function handleClick(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <aside className="p-4 bg-white rounded shadow-sm space-y-4 relative">
      {/* Search with typeahead */}
      <div className="relative" ref={suggestionsRef}>
        <label className="block text-sm font-medium">Search</label>

        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                confirmSearch(searchInput);
              }
            }}
            placeholder="Search products..."
            className="flex-1 p-2 border rounded"
            aria-label="Search products"
          />

          <button
            type="button"
            onClick={() => confirmSearch(searchInput)}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go
          </button>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-md z-40 max-h-56 overflow-auto">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => confirmSearch(s.title)}
              >
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-gray-500">{s.brand} · {s.category}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category || "all"}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="all">All</option>
          {normalizedCategories.map((c, i) => (
            <option key={`${c}-${i}`} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by */}
      <div>
        <label className="block text-sm font-medium">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-sm font-medium">Price range</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value || 0), priceRange[1]])}
            className="p-2 border rounded w-1/2"
            min={0}
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value || 0)])}
            className="p-2 border rounded w-1/2"
            min={0}
          />
        </div>
      </div>
    </aside>
  );
}


