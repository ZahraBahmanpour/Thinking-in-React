import "./ProductRow.css";

export default function ProductRow({ product }) {
  const { name, price, stocked } = product;
  return (
    <tr>
      <td className={`${stocked ? "" : "red border"}`}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
