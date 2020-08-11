import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { selectProductDetail, selectStatus } from "store/products/selectors";
import { fetchProduct } from "store/products/slice";
import { STATUS } from "store/products/constants";
import PriceTag from "components/PriceTag";

function useProductDetail(pid) {
  const product = useSelector((state) => selectProductDetail(state, pid));
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isEmpty = status === STATUS.INITIAL && !product;
  useEffect(
    function loadProductDetails() {
      if (isEmpty) {
        dispatch(fetchProduct(pid));
      }
    },
    [isEmpty, dispatch, pid]
  );

  return product || {};
}

export default function ProductDetail() {
  const { pid } = useParams();
  const product = useProductDetail(pid);
  console.log("ProductDetail", product);
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
