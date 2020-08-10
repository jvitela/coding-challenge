import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Header,
  Menu,
  Segment,
  Message,
  Button,
  Icon,
} from "semantic-ui-react";
import ProductsListFilters from "components/ProductsListFilters";
import { selectStatus, selectActiveBrand } from "store/products/selectors";
import { STATUS } from "store/products/constants";

export default function ProductsListMenu() {
  const status = useSelector(selectStatus);
  const brand = useSelector(selectActiveBrand);
  const [filterOpened, openFilters] = useState(status === STATUS.INITIAL);
  const icon = filterOpened ? "close" : "sliders horizontal";
  const toggleFilters = () => openFilters(!filterOpened);

  return (
    <Segment>
      <Menu borderless secondary>
        <Menu.Item header className="header--title">
          <Header as="h1">{brand || "Products List"}</Header>
        </Menu.Item>
        <Menu.Item>
          <Button
            circular
            icon={<Icon name={icon} aria-label={`${icon} icon`} />}
            onClick={toggleFilters}
          />
        </Menu.Item>
      </Menu>
      {!brand && <SelectBrandMessage />}
      {filterOpened && <ProductsListFilters />}
    </Segment>
  );
}

function SelectBrandMessage() {
  return (
    <Message>
      <Message.Header>Select a brand</Message.Header>
      <p>
        Please select at least a brand in order to display the list of its
        products.
      </p>
    </Message>
  );
}
