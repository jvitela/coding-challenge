import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { createStore } from "store";
import App from "App";

import { Server } from "miragejs";

let server;

beforeEach(() => {
  server = new Server({
    routes() {
      this.urlPrefix = "https://makeup-api.herokuapp.com/api/v1";
      this.get("products.json", () => [
        {
          id: 1,
          brand: "FooBar",
          name: "Test Product",
          price: "1.23",
          currency: "EUR",
          image_link: "#foo-bar-test",
          description: "Lorem ipsum dolor est.",
          rating: 4,
          category: "test",
          product_type: "tester",
          tag_list: ["test", "foo", "bar"],
          product_colors: [{ hex_value: "#000000", colour_name: "black" }],
        },
      ]);
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test("Default state", () => {
  const { getByText, getByLabelText, queryByRole } = render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );
  // Products list rendering by default
  expect(getByText("Products List")).toBeInTheDocument();
  // Filter controls are open
  expect(getByLabelText("close icon")).toBeInTheDocument();
  expect(getByLabelText(/Brand Name/)).toBeInTheDocument();
  expect(getByLabelText(/Product Name/)).toBeInTheDocument();
  // A message is displayed
  expect(getByText("Select a brand")).toBeInTheDocument();
  // List is not rendered
  expect(queryByRole("list")).not.toBeInTheDocument();
});

test("Select a brand", async () => {
  const { getByRole, queryByRole, getByLabelText } = render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );

  expect(queryByRole("list")).not.toBeInTheDocument();
  fireEvent.change(getByLabelText(/Brand Name/), {
    target: { value: "almay" },
  });
  await waitFor(() => {
    expect(getByRole("listbox")).toBeInTheDocument();
  });
  fireEvent.click(getByRole("option"));
  await waitFor(() => {
    expect(getByRole("list")).toBeInTheDocument();
  });
});
