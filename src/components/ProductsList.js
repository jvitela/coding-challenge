import React from "react";
import { List } from "semantic-ui-react";
import ProductItem from "components/ProductItem";
import { useSelector } from "react-redux";
import { selectProducts } from "store/products/selectors";

export default function ProductsList() {
  const productsList = useSelector(selectProducts);
  return (
    <List selection divided celled verticalAlign="middle">
      {productsList.map((item) => (
        <ProductItem {...item} key={item.id} />
      ))}
    </List>
  );
}
