import { STATUS } from "store/products/constants";

export default {
  pending(state) {
    state.status = STATUS.PRODUCT_LOADING;
  },

  fulfilled(state, action) {
    const product = action.payload;
    state.status = STATUS.PRODUCT_READY;
    state.products[product.id] = product;
    state.filter = { brand: product.brand };
  },

  rejected(state, action) {
    state.status = STATUS.BRANDS_LIST_READY;
    state.error = action.error;
    console.error(action);
  },
};
