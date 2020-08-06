import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Sticky, Ref, Dimmer, Loader } from "semantic-ui-react";
import ProductsList from "components/ProductsList";
import ProductsListMenu from "components/ProductsListMenu";
import { STATUS } from "store/products/constants";
import { selectStatus } from "store/products/selectors";

export default function ProductsListPage() {
  const contextRef = useRef();
  const status = useSelector(selectStatus);
  return (
    <Ref innerRef={contextRef}>
      <div>
        <Sticky context={contextRef}>
          <ProductsListMenu />
        </Sticky>
        {status === STATUS.BRAND_READY && <ProductsList />}
        {[STATUS.BRANDS_LIST_LOADING, STATUS.BRAND_LOADING].includes(
          status
        ) && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </div>
    </Ref>
  );
}
