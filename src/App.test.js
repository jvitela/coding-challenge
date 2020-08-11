import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Server } from "miragejs";
import { Provider } from "react-redux";
import { createStore } from "store";
import App from "App";
import { STATUS } from "store/products/constants";

let server;
const foobarProducts = {
  "1": {
    id: 1,
    brand: "foobar",
    name: "Test product name",
    price: "1.23",
    currency: "EUR",
    image_link: "#foo-bar-test",
    description: "Test product description.",
    rating: 4,
    category: "test",
    product_type: "tester",
    tag_list: ["test", "foo", "bar"],
    product_colors: [{ hex_value: "#000000", colour_name: "black" }],
  },
  "2": {
    id: 2,
    brand: "foobar",
    name: "Sample product name",
    price: "1.23",
    currency: "EUR",
    image_link: "#foo-bar-sample",
    description: "Sample product description.",
    rating: 4,
    category: "test",
    product_type: "tester",
    tag_list: ["sample", "foo", "bar"],
    product_colors: [{ hex_value: "#FFFFFF", colour_name: "white" }],
  },
};
beforeEach(() => {
  server = new Server({
    routes() {
      this.urlPrefix = "https://makeup-api.herokuapp.com/api/v1";
      this.get("products.json", () => Object.values(foobarProducts));
      this.get("products/1.json", () => foobarProducts["1"]);
      this.get("products/2.json", () => foobarProducts["2"]);
    },
  });
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

test("Default state", () => {
  const { getByText, getByLabelText, queryByRole } = render(
    <Provider store={createStore()}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
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
      <MemoryRouter>
        <App />
      </MemoryRouter>
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

test("Filter by name", async () => {
  const preloadedState = {
    Products: {
      status: STATUS.BRAND_READY,
      filters: {
        brand: "foobar",
      },
      products: {
        foobar: foobarProducts,
      },
      brands: [{ key: 1, text: "FooBar", value: "foobar" }],
    },
  };

  const store = createStore(preloadedState);
  const { getByRole, queryAllByRole, queryByText, getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(getByRole("list")).toBeInTheDocument();
  const slidersIcon = getByLabelText("sliders horizontal icon");
  expect(slidersIcon).toBeInTheDocument();
  expect(queryAllByRole("listitem").length).toBe(2);
  expect(queryByText("Test product name")).toBeInTheDocument();
  expect(queryByText("Sample product name")).toBeInTheDocument();

  // Open filter tools
  fireEvent.click(slidersIcon);
  let productName;
  await waitFor(() => {
    expect(getByLabelText(/Brand Name/)).toBeInTheDocument();
    productName = getByLabelText(/Product Name/);
    expect(productName).toBeInTheDocument();
  });

  // Filter by name
  fireEvent.change(productName, {
    target: { value: "te" },
  });
  await waitFor(() => {
    expect(queryByText("Test product name")).toBeInTheDocument();
    expect(queryByText("Sample product name")).not.toBeInTheDocument();
  });
});

test("Select product from the list", async () => {
  const preloadedState = {
    Products: {
      status: STATUS.BRAND_READY,
      filters: {
        brand: "foobar",
      },
      products: {
        foobar: foobarProducts,
      },
      brands: [{ key: 1, text: "FooBar", value: "foobar" }],
    },
  };

  const store = createStore(preloadedState);
  const { getByRole, queryByRole, queryByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(getByRole("list")).toBeInTheDocument();
  const testProductItem = queryByText("Test product name");
  expect(testProductItem).toBeInTheDocument();
  fireEvent.click(testProductItem);
  await waitFor(() => {
    expect(queryByRole("list")).not.toBeInTheDocument();
    expect(queryByText("Test product description.")).toBeInTheDocument();
  });
});

test("Load product page", async () => {
  const { queryByRole, queryByText } = render(
    <Provider store={createStore()}>
      <MemoryRouter initialEntries={["/1"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(queryByRole("list")).not.toBeInTheDocument();
  await waitFor(() => {
    expect(queryByText("Test product description.")).toBeInTheDocument();
  });
});
