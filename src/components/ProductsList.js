import React from "react";
import { Container, List, Message } from "semantic-ui-react";
import ProductItem from "components/ProductItem";

export default function ProductsList({ products }) {
  return (
    <Container>
      <List selection divided celled verticalAlign="middle">
        {products.map((item) => (
          <ProductItem {...item} key={item.id} />
        ))}
      </List>
      {products.length === 0 && <EmptyFilterMessage />}
    </Container>
  );
}

function EmptyFilterMessage() {
  return (
    <Message>
      <Message.Header>No products to be displayed</Message.Header>
    </Message>
  );
}
