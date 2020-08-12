import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Segment, Sticky, Ref, Dimmer, Loader } from "semantic-ui-react";
import ProductsList from "components/ProductsList";
import ProductsListMenu from "components/ProductsListMenu";
import { STATUS } from "store/products/constants";
import { selectStatus } from "store/products/selectors";
import useProductsList from "hooks/useProductsList";

export default function ProductsListPage() {
  const contextRef = useRef();
  const status = useSelector(selectStatus);
  const products = useProductsList();
  const isReady = [STATUS.BRAND_READY].includes(status);
  const isLoading = [STATUS.BRANDS_LIST_LOADING, STATUS.BRAND_LOADING].includes(
    status
  );
  return (
    <Ref innerRef={contextRef}>
      <div className="list-page">
        <Sticky context={contextRef}>
          <Segment raised>
            <ProductsListMenu />
          </Segment>
        </Sticky>
        {isReady && <ProductsList products={products} />}
        {isLoading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </div>
    </Ref>
  );
}
