import React from "react";
import {
  Header,
  Menu,
  Form,
  Dropdown,
  Segment,
  Button,
} from "semantic-ui-react";

const brandNames = [
  "almay",
  "alva",
  "anna sui",
  "annabelle",
  "benefit",
  "boosh",
  "burt's bees",
  "butter london",
  "c'est moi",
  "cargo cosmetics",
  "china glaze",
  "clinique",
  "coastal classic creation",
  "colourpop",
  "covergirl",
  "dalish",
  "deciem",
  "dior",
  "dr. hauschka",
  "e.l.f.",
  "essie",
  "fenty",
  "glossier",
  "green people",
  "iman",
  "l'oreal",
  "lotus cosmetics usa",
  "maia's mineral galaxy",
  "marcelle",
  "marienatie",
  "maybelline",
  "milani",
  "mineral fusion",
  "misa",
  "mistura",
  "moov",
  "nudus",
  "nyx",
  "orly",
  "pacifica",
  "penny lane organics",
  "physicians formula",
  "piggy paint",
  "pure anada",
  "rejuva minerals",
  "revlon",
  "sally b's skin yummies",
  "salon perfect",
  "sante",
  "sinful colours",
  "smashbox",
  "stila",
  "suncoat",
  "w3llpeople",
  "wet n wild",
  "zorah",
  "zorah biocosmetiques",
];

function getBrandOptions() {
  return brandNames.map((name, idx) => ({
    key: idx,
    text: name,
    value: name,
  }));
}

export default function ProductsListFilters({ onClick }) {
  return (
    <Segment>
      <Menu borderless secondary>
        <Menu.Item header className="header--title">
          <Header as="h1">Filters</Header>
        </Menu.Item>
        <Menu.Item>
          <Button circular icon="close" onClick={onClick} />
        </Menu.Item>
      </Menu>
      <Form>
        <Form.Field>
          <label>Brand Name</label>
          <Dropdown search selection options={getBrandOptions()} />
        </Form.Field>
        <Form.Field>
          <label>Product Name</label>
          <input />
        </Form.Field>
      </Form>
    </Segment>
  );
}
