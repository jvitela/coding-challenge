import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProductDetail, selectStatus } from "store/products/selectors";
import { fetchProduct } from "store/products/slice";
import { STATUS } from "store/products/constants";

export default function useProductDetail(pid) {
  const product = useSelector((state) => selectProductDetail(state, pid));
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isEmpty = status === STATUS.INITIAL && !product;
  useEffect(
    function loadProductDetails() {
      if (isEmpty) {
        dispatch(fetchProduct(pid));
      }
    },
    [isEmpty, dispatch, pid]
  );

  return product || {};
}
