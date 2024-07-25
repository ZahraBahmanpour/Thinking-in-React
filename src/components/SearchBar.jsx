import { useRef } from "react";

export default function SearchBar({ onFilterChange, onStockChange }) {
  const inputRef = useRef(null);
  return (
    <div>
      <input
        type="text"
        placeholder="search here..."
        onChange={(e) => onFilterChange(e.target.value)}
        ref={inputRef}
      />
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
      <br />
      <label>
        Only show products in stock
        <input
          type="checkbox"
          onChange={(e) => onStockChange(e.target.checked)}
        />
      </label>
      <br />
    </div>
  );
}
