import React from "react";
import { Segment, Image, Placeholder } from "semantic-ui-react";
import DescriptionPlaceholder from "components/DescriptionPlaceholder";
import PaletteItem from "components/PaletteItem";

export default function ProductInformation({
  image_link,
  product_colors,
  description,
}) {
  return (
    <>
      <Segment vertical placeholder>
        {image_link ? (
          <Image centered src={image_link} />
        ) : (
          <Placeholder.Image square />
        )}
      </Segment>
      <Segment vertical textAlign="center">
        {(product_colors || []).map((item) => (
          <PaletteItem
            color={item.hex_value}
            title={item.colour_name}
            key={item.hex_value}
          />
        ))}
      </Segment>
      <Segment vertical>
        <p>{description}</p>
      </Segment>
      {!description && <DescriptionPlaceholder />}
    </>
  );
}
