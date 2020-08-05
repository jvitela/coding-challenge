import React from "react";
import { Image, List } from "semantic-ui-react";

export default function ProductItem({ name, image_link }) {
  return (
    <List.Item>
      <List.Content floated="left">
        <Image avatar src={image_link} />
      </List.Content>
      <List.Content verticalAlign="middle">{name}</List.Content>
    </List.Item>
  );
}
