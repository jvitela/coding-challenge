import { configureStore } from "@reduxjs/toolkit";
import { Products } from "store/products/slice";

export default configureStore({
  reducer: {
    [Products.name]: Products.reducer,
  },
});
