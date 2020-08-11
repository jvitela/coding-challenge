import React from "react";
import { Header } from "semantic-ui-react";
import PriceTag from "components/PriceTag";

export default function ProductFooter({ price, price_sign }) {
  return (
    <Header size="large" textAlign="center">
      {price && <PriceTag amount={price} currency={price_sign} />}
    </Header>
  );
}
