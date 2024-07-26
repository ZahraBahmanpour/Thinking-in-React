import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductTable from "./ProductTable";

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [isStock, setIsStock] = useState(false);

  const {
    isLoading: loading,
    data: products,
    isError,
    error,
    status,
    refetch,
  } = useQuery({
    queryKey: ["products", filterText, isStock],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:4000/products?name_like=${filterText}&stocked_like=${
          isStock || ""
        }`
      );
      return res.data;
    },
    retry: 3,
    retryDelay: 4000,
    // refetchOnWindowFocus: true,
    // refetchInterval: 3000,
  });

  return (
    <>
      <SearchBar
        onFilterChange={(text) => setFilterText(text)}
        onStockChange={(ch) => setIsStock(ch)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  );
}
