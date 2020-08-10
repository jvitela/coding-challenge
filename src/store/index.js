import { configureStore } from "@reduxjs/toolkit";
import { Products } from "store/products/slice";

export function createStore() {
  return configureStore({
    reducer: {
      [Products.name]: Products.reducer,
    },
  });
}
