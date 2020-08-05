import ky from "ky";

const httpClient = ky.extend({
  prefixUrl: "https://makeup-api.herokuapp.com/api/v1",
});

function getProduct(pid) {
  return httpClient.get(`products/${id}.json`).json();
}

function getProductsList() {
  return httpClient
    .get(`products.json`, {
      searchParams: {
        brand: "maybelline",
      },
    })
    .json();
}

export default {
  getProduct,
  getProductsList,
};
