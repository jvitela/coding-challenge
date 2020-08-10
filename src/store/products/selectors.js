import { createSelector } from "@reduxjs/toolkit";
import { PRODUCTS, STATUS } from "store/products/constants";

export const selectStatus = (state) => state[PRODUCTS].status;
export const selectError = (state) => state[PRODUCTS].error;
export const selectFilters = (state) => state[PRODUCTS].filters;
export const selectBrandOptions = (state) => state[PRODUCTS].brands;
export const selectActiveBrand = (state) => selectFilters(state).brand;

export const selectProducts = createSelector(
  selectActiveBrand,
  selectFilters,
  (state) => state[PRODUCTS].products,
  (brand, filters, products) => applyFilters(filters, products[brand])
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

const filterMethods = {
  // Filter by item name
  name(item, filters) {
    return item.name.toLowerCase().includes(filters.name.toLowerCase());
  },
};

/**
 * Filters the products by applying all the defined filters
 * @param {object} filters
 * @param {array} products
 */
function applyFilters(filters = {}, products = []) {
  const fieldNames = Object.keys(filters);
  return products.filter((item) =>
    fieldNames.every((field) => {
      const filterFn = filterMethods[field];
      return filterFn ? filterFn(item, filters) : true;
    })
  );
}
