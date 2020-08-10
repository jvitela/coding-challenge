import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Segment,
  Header,
  Rating,
  Image,
  Icon,
  Popup,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectProductDetail } from "store/products/selectors";

// const colors = [
//   { hex_value: "#EC8389", colour_name: "Peaching To The Choir " },
//   { hex_value: "#C7797B", colour_name: "Passionate Plum " },
//   { hex_value: "#EE8581", colour_name: "Luv Me Gently " },
//   { hex_value: "#E88C90", colour_name: "Get Me To The Alter " },
//   { hex_value: "#F591A6", colour_name: "Cheeky Cherub " },
// ];

function useProductDetail(pid) {
  const product = useSelector((state) => selectProductDetail(state, pid));
  return product;
}

export default function ProductDetail() {
  const { pid } = useParams();
  const product = useProductDetail(pid);
  return (
    <>
      <Header as="header" textAlign="center">
        <h1>
          <small className="ui container text small">{product.brand}</small>
          <span>{product.name}</span>
        </h1>
        <Rating
          icon="star"
          defaultRating={product.rating}
          maxRating={5}
          disabled
        />
        {product.rating === null && <small>(n/a)</small>}
      </Header>
      <Segment placeholder>
        <Image centered src={product.image_link} />
      </Segment>
      <Container textAlign="center">
        {product.product_colors &&
          product.product_colors.map((item) => (
            <PaletteItem color={item.hex_value} title={item.colour_name} />
          ))}
      </Container>
      <Container as="p">{product.description}</Container>
      <Header size="large" textAlign="center">
        {product.price &&
          product.price_sign &&
          `${product.price_sign} ${product.price}`}
      </Header>
    </>
  );
}

function PaletteItem({ color, title }) {
  return (
    <Popup
      content={title}
      trigger={
        <span style={{ color }}>
          <Icon name="circle" size="large" />
        </span>
      }
    />
  );
}
