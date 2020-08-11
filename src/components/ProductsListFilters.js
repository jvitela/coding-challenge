import React from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveBrand } from "store/products/selectors";
import { fetchBrandProducts, filterByName } from "store/products/slice";
import useBrandOptions from "hooks/useBrandOptions";

export default function ProductsListFilters() {
  const brandOptions = useBrandOptions();
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
        autoComplete="off"
        onChange={searchName}
      />
    </Form>
  );
}
