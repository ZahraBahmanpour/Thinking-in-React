import { useEffect, useReducer, useState } from "react";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import axios from "axios";

const ACTIONS = {
  FETCH_LOADING: "fetch_loading",
  FETCH_SUCCESS: "fetch_success",
  FETCH_ERROR: "fetch_error",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_LOADING:
      return { ...state, loading: true };
    case ACTIONS.FETCH_SUCCESS:
      return { error: "", loading: false, products: action.payload };
    case ACTIONS.FETCH_ERROR:
      return { products: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [isStock, setIsStock] = useState(false);

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: false,
    error: "",
  });
  const readProducts = async () => {
    try {
      dispatch({ type: ACTIONS.FETCH_LOADING });
      // setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/products?name_like=${filterText}&stocked_like=${
          isStock || ""
        }`
      );
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: res.data });
      // setProducts(res.data);
    } catch (e) {
      console.log(e.message);
      // setError(e.message);
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: e.message });
    }
  };

  useEffect(() => {
    let timerId = setTimeout(() => readProducts(), 1000);
    return () => clearTimeout(timerId);
  }, [filterText]);

  useEffect(() => {
    readProducts();
  }, [isStock]);

  return (
    <>
      <SearchBar
        onFilterChange={(text) => setFilterText(text)}
        onStockChange={(ch) => setIsStock(ch)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  );
}
