import { createSelector } from "@reduxjs/toolkit";
import { PRODUCTS } from "store/products/constants";

export const selectStatus = (state) => state[PRODUCTS].status;
export const selectError = (state) => state[PRODUCTS].error;
export const selectFilters = (state) => state[PRODUCTS].filters;
export const selectBrandOptions = (state) => state[PRODUCTS].brands;
export const selectActiveBrand = (state) => selectFilters(state).brand;
export const selectAllProductsByBrand = (state) => state[PRODUCTS].products;

export const selectProducts = createSelector(
  selectActiveBrand,
  selectFilters,
  selectAllProductsByBrand,
  (brand, filters, productsByBrand) => {
    const products = productsByBrand[brand]
      ? Object.values(productsByBrand[brand])
      : [];
    return applyFilters(filters, products);
  }
);

export const selectProductDetail = createSelector(
  selectAllProductsByBrand,
  (_, pid) => pid,
  (productsByBrand, pid) => {
    const brand = Object.keys(productsByBrand).find(
      (brand) => pid in productsByBrand[brand]
    );
    return brand && productsByBrand[brand][pid];
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
