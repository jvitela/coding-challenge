import { STATUS } from "store/products/constants";

export default {
  pending(state) {
    state.status = STATUS.BRANDS_LIST_LOADING;
    state.brands = [];
  },

  fulfilled(state, action) {
    state.status = STATUS.BRANDS_LIST_READY;
    state.brands = action.payload;
  },

  rejected(state, action) {
    state.status = STATUS.ERROR;
    state.error = action.error;
    console.error(action);
  },
};
