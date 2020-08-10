import { configureStore } from "@reduxjs/toolkit";
import { Products } from "store/products/slice";

export function createStore(preloadedState) {
  return configureStore({
    preloadedState,
    reducer: {
      [Products.name]: Products.reducer,
    },
  });
}
