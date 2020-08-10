import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeUpApi from "api/makeUp";
import brandProducts from "store/products/reducers/brandProducts";
import productDetails from "store/products/reducers/productDetails";
import brandsList from "store/products/reducers/brandsList";
import {
  PRODUCTS,
  FILTER_BY_NAME,
  FETCH_BRANDS,
  FETCH_PRODUCT,
  FETCH_BRAND_PRODUCTS,
  STATUS,
} from "store/products/constants";
import createDebouncedAction from "store/createDebouncedAction";

const FILTER_DEBOUNCE_MILLISECONDS = 300;

/**
 * Fetch one product details
 */
export const fetchProduct = createAsyncThunk(
  FETCH_PRODUCT,
  async (pid) => await makeUpApi.getProduct(pid)
);

/**
 * Fetch a list of product details filtered by brand
 */
export const fetchBrandProducts = createAsyncThunk(
  FETCH_BRAND_PRODUCTS,
  async (brand) => {
    const products = await makeUpApi.getAllProducts({ brand });
    const result = {};
    products.forEach((product) => (result[product.id] = product));
    return result;
  }
);

/**
 * Fetch a list of product details filtered by brand
 */
export const fetchBrands = createAsyncThunk(
  FETCH_BRANDS,
  async () => await makeUpApi.getAllBrands()
);

/**
 * Set filter by product name
 */
export const filterByName = createDebouncedAction(
  FILTER_BY_NAME,
  FILTER_DEBOUNCE_MILLISECONDS
);

/**
 * The store slice
 */
export const Products = createSlice({
  name: PRODUCTS,

  initialState: {
    status: STATUS.INITIAL,
    filters: {},
    products: {},
    brands: [],
  },

  extraReducers: {
    [FILTER_BY_NAME]: (state, action) => {
      state.filters.name = action.payload;
    },

    [fetchBrandProducts.pending]: brandProducts.pending,
    [fetchBrandProducts.fulfilled]: brandProducts.fulfilled,
    [fetchBrandProducts.rejected]: brandProducts.rejected,

    [fetchProduct.pending]: productDetails.pending,
    [fetchProduct.fulfilled]: productDetails.fulfilled,
    [fetchProduct.rejected]: productDetails.rejected,

    [fetchBrands.pending]: brandsList.pending,
    [fetchBrands.fulfilled]: brandsList.fulfilled,
    [fetchBrands.rejected]: brandsList.rejected,
  },
});
