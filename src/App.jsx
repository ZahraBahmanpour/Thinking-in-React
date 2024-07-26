import CreateNewProduct from "./components/CreateNewProduct";
import FilterableProductTable from "./components/FilterableProductTable(ReactQuery)";

function App() {
  return (
    <>
      <FilterableProductTable />
      <CreateNewProduct />
    </>
  );
}

export default App;
