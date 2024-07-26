import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./ProductRow.css";
import axios from "axios";

export default function ProductRow({ product }) {
  const { name, price, stocked, id } = product;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`http://localhost:4000/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  return (
    <tr>
      <td className={`${stocked ? "" : "red border"}`}>{name}</td>
      <td>{price}</td>
      <td>
        <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
      </td>
    </tr>
  );
}
