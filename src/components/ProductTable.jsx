import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

export default function ProductTable({ products }) {
  const productsByCategory = Object.groupBy(
    products,
    ({ category }) => category
  );
  // console.log(products);
  // console.log(productsByCategory);
  // console.log(Object.entries(productsByCategory));
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(productsByCategory).map((p) => (
          <>
            <ProductCategoryRow category={p[0]} />
            {p[1].map((product) => (
              <ProductRow product={product} />
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}
