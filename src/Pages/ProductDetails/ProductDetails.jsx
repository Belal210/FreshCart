import ProductInfo from "../../Components/ProductInfo/ProductInfo";
import { useParams } from "react-router";
import ProductDetailsTabs from "../../Components/ProductDetailsTabs/ProductDetailsTabs";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import { useProductDetails } from "../../hooks/useProductDetails";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import ProductInfoSkeleton from "../../Components/skeleton/ProductInfoSkeleton";

export default function ProductDetails() {
  const { id } = useParams();

  const { productDetails, isLoading, isError, error } = useProductDetails(id);

  if (isLoading) {
    return <ProductInfoSkeleton />;
  }

  return (
    <>
      <PageMetaData title={productDetails.title} description={productDetails.description} />
      <ProductInfo productDetails={productDetails} />
      <ProductDetailsTabs productDetails={productDetails}/>
      <RelatedProducts productDetails={productDetails} />
    </>
  );
}
