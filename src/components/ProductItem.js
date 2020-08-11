import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";

export default function ProductItem({ id, name, image_link }) {
  return (
    <List.Item className="item--product">
      <List.Content floated="left">
        <Image avatar src={image_link} />
      </List.Content>
      <List.Content verticalAlign="middle">
        <Link to={`/${id}`}>{name}</Link>
      </List.Content>
    </List.Item>
  );
}
