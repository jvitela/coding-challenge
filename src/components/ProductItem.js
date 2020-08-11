import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import PriceTag from "components/PriceTag";

export default function ProductItem({
  id,
  name,
  price,
  price_sign,
  image_link,
}) {
  return (
    <List.Item className="product" as={Link} to={`/${id}`}>
      <List.Content className="product__image">
        <Image avatar src={image_link} />
      </List.Content>
      <List.Content className="product__name">{name}</List.Content>
      <List.Content className="product__price">
        <PriceTag amount={price} currency={price_sign} />
      </List.Content>
    </List.Item>
  );
}
