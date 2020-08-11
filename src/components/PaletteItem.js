import React from "react";
import { Popup, Icon } from "semantic-ui-react";

export default function PaletteItem({ color, title }) {
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
