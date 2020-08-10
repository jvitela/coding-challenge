import ky from "ky/umd"; // https://github.com/sindresorhus/ky/issues/170
import brandNames from "api/brandNames";

const httpClient = ky.extend({
  prefixUrl: "https://makeup-api.herokuapp.com/api/v1",
});

/**
 * Retrieves the data for a single product by Id
 * TODO: Validate input
 * @param {string} pid
 */
function getProduct(pid) {
  return httpClient.get(`products/${pid}.json`).json();
}

/**
 * Retrieves a list of products with the given filters
 * TODO: Validate input
 * @param {object} searchParams
 */
async function getAllProducts(searchParams) {
  const result = {};
  const products = await httpClient
    .get(`products.json`, { searchParams })
    .json();
  products.forEach((product) => (result[product.id] = product));
  return result;
}

/**
 * Returns brands info
 */
function getAllBrands() {
  return brandNames.map((name, idx) => ({
    key: idx,
    text: name,
    value: name,
  }));
}

export default {
  getProduct,
  getAllProducts,
  getAllBrands,
};
