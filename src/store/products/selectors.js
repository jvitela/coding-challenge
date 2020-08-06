import { createSelector } from "@reduxjs/toolkit";
import { PRODUCTS, STATUS } from "store/products/constants";

export const selectStatus = (state) => state[PRODUCTS].status;
export const selectError = (state) => state[PRODUCTS].error;
export const selectActiveBrand = (state) => state[PRODUCTS].filters?.brand;
export const selectBrandOptions = (state) => state[PRODUCTS].brands;

export const selectProducts = createSelector(
  selectActiveBrand,
  (state) => state[PRODUCTS].products,
  (brand, products) => products[brand] || []
);

export const selectProductDetail = createSelector(
  selectError,
  selectStatus,
  selectProducts,
  (_, pid) => pid,
  (error, status, products, pid) => {
    const loading = status === STATUS.PRODUCT_LOADING;
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
