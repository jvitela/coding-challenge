import React, { useEffect } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStatus,
  selectActiveBrand,
  selectBrandOptions,
} from "store/products/selectors";
import {
  fetchBrands,
  fetchBrandProducts,
  filterByName,
} from "store/products/slice";
import { STATUS } from "store/products/constants";

function useBrandOptions() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const brandOptions = useSelector(selectBrandOptions);
  const isEmpty = status === STATUS.INITIAL && brandOptions.length === 0;
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

export default function ProductsListFilters() {
  const brandOptions = useBrandOptions(selectBrandOptions);
  const dispatch = useDispatch();
  const brand = useSelector(selectActiveBrand);
  const selectBrand = (_, data) => {
    dispatch(fetchBrandProducts(data.value));
  };
  const searchName = (_, data) => {
    dispatch(filterByName(data.value));
  };

  return (
    <Form>
      <Form.Field>
        <label>
          Brand Name
          <Dropdown
            search
            selection
            className="dropdown--brandName"
            value={brand}
            options={brandOptions}
            onChange={selectBrand}
          />
        </label>
      </Form.Field>
      <Form.Input
        label="Product Name"
        id="productName"
        disabled={!brand}
        onChange={searchName}
      />
    </Form>
  );
}
