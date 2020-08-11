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
  Placeholder,
} from "semantic-ui-react";
import PriceTag from "components/PriceTag";
import useProductDetail from "hooks/useProductDetail";

export default function ProductDetail() {
  const { pid } = useParams();
  const product = useProductDetail(pid);
  return (
    <>
      <Header as="header" textAlign="center">
        <h1>
          <small className="ui container text small">{product.brand}</small>
          <span>{product.name}</span>
          {!product.name && (
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          )}
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
        {product.image_link ? (
          <Image centered src={product.image_link} />
        ) : (
          <Placeholder.Image square />
        )}
      </Segment>
      <Container textAlign="center">
        {(product.product_colors || []).map((item) => (
          <PaletteItem
            color={item.hex_value}
            title={item.colour_name}
            key={item.hex_value}
          />
        ))}
      </Container>
      <Container as="p">{product.description}</Container>
      {!product.description && (
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      )}
      <Header size="large" textAlign="center">
        {product.price && (
          <PriceTag amount={product.price} currency={product.price_sign} />
        )}
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
