import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectStatus, selectBrandOptions } from "store/products/selectors";
import { fetchBrands } from "store/products/slice";
import { STATUS } from "store/products/constants";

export default function useBrandOptions() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const brandOptions = useSelector(selectBrandOptions);
  const isEmpty =
    [STATUS.INITIAL, STATUS.PRODUCT_READY].includes(status) &&
    brandOptions.length === 0;
  useEffect(
    function loadBrandNames() {
      if (isEmpty) {
        dispatch(fetchBrands());
      }
    },
    [isEmpty, dispatch]
  );
  return brandOptions;
}
