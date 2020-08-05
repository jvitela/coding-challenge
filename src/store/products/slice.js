import {
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { makeUpApi } from "../../api/makeUp";

const SLICE_ID = "Products";

export const fetchProduct = createAsyncThunk(
  `${SLICE_ID}/fetchProduct`,
  async (pid) => await makeUpApi.getProduct(pid)
);

const selectError = (state) => state[SLICE_ID].error;
const selectStatus = (state) => state[SLICE_ID].status;
const selectProducts = (state) => state[SLICE_ID].products;

export const selectProductDetail = createSelector(
  selectError,
  selectStatus,
  selectProducts,
  (_, pid) => pid,
  (error, status, products, pid) => {
    const loading = status === fetchProduct.pending.toString();
    const data = products[pid];
    const shouldFetch = !data && !loading;
    return {
      error,
      loading,
      data,
      shouldFetch,
    };
  }
);

export const Products = createSlice({
  name: SLICE_ID,

  initialState: {
    status: `${SLICE_ID}/initial`,
    products: {},
  },

  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = action.type;
    },

    [fetchProduct.fulfilled]: (state, action) => {
      const product = action.payload;
      state.status = action.type;
      state.products[product.id] = product;
      state.filter = { brand: product.brand };
    },

    [fetchProduct.rejected]: (state, action) => {
      state.status = `${SLICE_ID}/initial`;
      state.error = action.error;
      console.log(action);
    },
  },
});
