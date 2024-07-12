import { useState } from "react";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

export default function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [isStock, setIsStock] = useState(false);

  let filteredProducts = products.filter((p) => p.name.includes(filterText));
  console.log(isStock);
  if (isStock) {
    filteredProducts = filteredProducts.filter((p) => p.stocked);
  }
  return (
    <>
      <SearchBar
        onFilterChange={(text) => setFilterText(text)}
        onStockChange={(ch) => setIsStock(ch)}
      />
      <ProductTable products={filteredProducts} />
    </>
  );
}

// class FilterableProductTable extends React.Component {
//   constructor() {
//     this.state.theme = "dark";
//   }
// }
