import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { STATUS } from "store/products/constants";
import {
  selectProducts,
  selectStatus,
  selectRandomBrand,
} from "store/products/selectors";
import { fetchBrandProducts } from "store/products/slice";

export default function useProductsList() {
  const productsList = useSelector(selectProducts);
  const { location } = useHistory();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const brand = useSelector(selectRandomBrand);
  const isEmpty =
    location.search === "?random" && // Only fetch automatically if this param is sent
    status === STATUS.BRANDS_LIST_READY &&
    productsList.length === 0;

  useEffect(
    function loadBrandProducts() {
      if (isEmpty) {
        dispatch(fetchBrandProducts(brand));
      }
    },
    [isEmpty, brand, dispatch]
  );
  return productsList;
}
