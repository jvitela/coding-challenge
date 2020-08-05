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
} from "semantic-ui-react";

const colors = [
  { hex_value: "#EC8389", colour_name: "Peaching To The Choir " },
  { hex_value: "#C7797B", colour_name: "Passionate Plum " },
  { hex_value: "#EE8581", colour_name: "Luv Me Gently " },
  { hex_value: "#E88C90", colour_name: "Get Me To The Alter " },
  { hex_value: "#F591A6", colour_name: "Cheeky Cherub " },
];

export default function ProductDetail() {
  const { pid } = useParams();
  return (
    <>
      <Header as="header" textAlign="center">
        <h1>
          <small className="ui container text small">Brand name</small>
          <span>Product: {pid}</span>
        </h1>
        <Rating icon="star" defaultRating={3} maxRating={4} />
      </Header>
      <Segment placeholder>
        <Image
          centered
          src="https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png"
        />
      </Segment>
      <Container textAlign="center">
        {colors.map((item) => (
          <PaletteItem color={item.hex_value} title={item.colour_name} />
        ))}
      </Container>
      <Container as="p">
        Create naturally flushed looking cheeks with Saint Cosmetics' blush
        formulations. Designed to be worn alone or layered for more
        depth.Features: An ultra-blendable blush with a long-lasting
        formulaSilky smooth finishCreates a multi-dimensional lookMade in Canada
        from naturally derived ingredientsChemical Free, Vegan, Gluten Free
      </Container>
      <Header size="large" textAlign="center">
        €123.456
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
