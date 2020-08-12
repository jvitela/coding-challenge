import React from "react";
import { useParams } from "react-router-dom";
import ProductHeader from "components/ProductHeader";
import ProductInformation from "components/ProductInformation";
import ProductFooter from "components/ProductFooter";
import useProductDetail from "hooks/useProductDetail";

export default function ProductDetail() {
  const { pid } = useParams();
  const product = useProductDetail(pid);
  return (
    <div className="detail-page">
      <ProductHeader {...product} />
      <ProductInformation {...product} />
      <ProductFooter {...product} />
    </div>
  );
}
