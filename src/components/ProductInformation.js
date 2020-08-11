import React from "react";
import { Container, Segment, Image, Placeholder } from "semantic-ui-react";
import DescriptionPlaceholder from "components/DescriptionPlaceholder";
import PaletteItem from "components/PaletteItem";

export default function ProductInformation({
  image_link,
  product_colors,
  description,
}) {
  return (
    <>
      <Segment placeholder>
        {image_link ? (
          <Image centered src={image_link} />
        ) : (
          <Placeholder.Image square />
        )}
      </Segment>
      <Container textAlign="center">
        {(product_colors || []).map((item) => (
          <PaletteItem
            color={item.hex_value}
            title={item.colour_name}
            key={item.hex_value}
          />
        ))}
      </Container>
      <Container as="p">{description}</Container>
      {!description && <DescriptionPlaceholder />}
    </>
  );
}
