import { STATUS } from "store/products/constants";

function pending(state, action) {
  // TODO: Verify that filters contains at least the brand
  state.status = STATUS.BRAND_LOADING;
  state.filters.brand = action.meta.arg;
}

function fulfilled(state, action) {
  const { brand } = state.filters;
  if (brand) {
    state.status = STATUS.BRAND_READY;
    state.products[brand] = action.payload;
  } else {
    action.error = new Error("Unknown brand");
    return rejected(state, action);
  }
}

function rejected(state, action) {
  state.status = STATUS.BRANDS_LIST_READY;
  state.error = action.error;
  console.error(action);
}

export default {
  pending,
  fulfilled,
  rejected,
};
