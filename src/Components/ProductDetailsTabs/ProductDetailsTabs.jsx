import { useState } from "react";
import ProductInfoTab from "./ProductInfoTab";
import ProductReviewsTab from "./ProductReviewsTab";
import ProductShippingTab from "./ProductShippingTab";

export default function ProductDetailsTabs({ productDetails }) {
  const [activeTab, setActiveTab] = useState("details");

  function showActiveTab() {
    switch (activeTab) {
      case "details":
        return <ProductInfoTab productDetails={productDetails} />;
      case "reviews":
        return <ProductReviewsTab productDetails={productDetails} />;
      case "shipping":
        return <ProductShippingTab productDetails={productDetails} />;
      default:
        return <ProductInfoTab productDetails={productDetails} />;
    }
  }

  return (
    <>
      <section className="py-6 bg-gray-50">
        <div className="container">
          <div className="rounded-lg overflow-hidden bg-white">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-6 py-4 font-medium text-sm md:text-[16px] text-center ${activeTab === "details" ? "text-primary-600 border-b-2" : "text-gray-600"} hover:text-primary-600 border-primary-600`}
                  onClick={() => setActiveTab("details")}
                >
                  Product Details
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm md:text-[16px] text-center ${activeTab === "reviews" ? "text-primary-600 border-b-2" : "text-gray-600"} hover:text-primary-600 border-primary-600`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({productDetails?.ratingsQuantity})
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm md:text-[16px] text-center ${activeTab === "shipping" ? "text-primary-600 border-b-2" : "text-gray-600"} hover:text-primary-600 border-primary-600`}
                  onClick={() => setActiveTab("shipping")}
                >
                  Shipping & Returns
                </button>
              </div>
            </div>

            <div className="p-5">{showActiveTab()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
