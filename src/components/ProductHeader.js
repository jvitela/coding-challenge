import React from "react";
import { Header, Rating } from "semantic-ui-react";
import NamePlaceholder from "components/NamePlaceholder";

const MAX_PRODUCT_RATING = 5;

export default function ProductHeader({ name, brand, rating }) {
  return (
    <Header as="header" textAlign="center">
      <h1>
        <small>{brand}</small>
        <br />
        <span>{name}</span>
        {!name && <NamePlaceholder />}
      </h1>
      <Rating
        icon="star"
        defaultRating={rating}
        maxRating={MAX_PRODUCT_RATING}
        disabled
      />
      {rating === null && <small>(n/a)</small>}
    </Header>
  );
}
