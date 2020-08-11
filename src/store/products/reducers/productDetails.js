import { STATUS } from "store/products/constants";

export default {
  pending(state) {
    state.status = STATUS.PRODUCT_LOADING;
    state.error = null;
  },

  fulfilled(state, action) {
    const product = action.payload;
    if (!(product.brand in state.products)) {
      state.products[product.brand] = {};
    }
    if (!state.filter) {
      state.filter = {};
    }
    state.status = STATUS.PRODUCT_READY;
    state.products[product.brand][product.id] = product;
    state.filter.brand = product.brand;
    state.error = null;
  },

  rejected(state, action) {
    state.status = STATUS.INITIAL;
    state.error = action.error;
    console.error(action);
  },
};
