export default function SearchBar({ onFilterChange, onStockChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="search here..."
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <br />
      <label>
        Only show products in stock
        <input
          type="checkbox"
          onChange={(e) => onStockChange(e.target.checked)}
        />
      </label>
    </div>
  );
}
