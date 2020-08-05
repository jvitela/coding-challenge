import React from "react";
import { Header, Menu, Segment, Button } from "semantic-ui-react";

export default function ProductsListMenu({ onClick }) {
  return (
    <Segment>
      <Menu borderless secondary>
        <Menu.Item header className="header--title">
          <Header as="h1">Products List</Header>
        </Menu.Item>
        <Menu.Item>
          <Button circular icon="sliders horizontal" onClick={onClick} />
        </Menu.Item>
      </Menu>
    </Segment>
  );
}
