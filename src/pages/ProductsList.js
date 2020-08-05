import React, { useState, useRef } from "react";
import { Sticky, Ref, List } from "semantic-ui-react";
import ProductItem from "components/ProductItem";
import ProductsListMenu from "components/ProductsListMenu";
import ProductsListFilters from "components/ProductsListFilters";

const list = [
  {
    id: 1,
    brand: "maybelline",
    name: "First Maybelline Face Studio",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 2,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 3,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 4,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 5,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 6,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 7,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 8,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 9,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
  {
    id: 10,
    brand: "maybelline",
    name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
    price: "14.99",
    currency: null,
    image_link:
      "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
  },
];

export default function ProductsList() {
  const [filterOpened, openFilters] = useState(false);
  const contextRef = useRef();
  return (
    <Ref innerRef={contextRef}>
      <div>
        <Sticky context={contextRef}>
          {filterOpened ? (
            <ProductsListFilters onClick={() => openFilters(false)} />
          ) : (
            <ProductsListMenu onClick={() => openFilters(true)} />
          )}
        </Sticky>
        <List selection divided celled verticalAlign="middle">
          {list.map((item) => (
            <ProductItem {...item} key={item.id} />
          ))}
        </List>
      </div>
    </Ref>
  );
}
