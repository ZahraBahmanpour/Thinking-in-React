import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function CreateNewProduct() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({ nameError: "", priceError: "" });

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const res = await axios.post("http://localhost:4000/products", product);
      return res.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries("products");
    // },
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (oldProducts) => {
        console.log(oldProducts);
        return [...oldProducts, newProduct];
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name,
      price,
      stocked: true,
      category: "Fruits",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {error.nameError && (
        <span style={{ color: "red" }}>{error.nameError}</span>
      )}
      <br />
      <label>
        Price
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      {error.priceError && (
        <span style={{ color: "red" }}>{error.priceError}</span>
      )}
      <input type="submit" value={"Create New"} />
    </form>
  );
}
