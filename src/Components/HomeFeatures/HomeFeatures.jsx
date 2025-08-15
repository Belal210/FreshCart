import { faArrowRotateLeft, faHeadset, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeFeatures() {
  return (
    <>
      <div className="py-10 bg-white">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-md px-3 py-4 flex items-center gap-2">
            <div className="icon min-w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-lg text-primary-600"
              />
            </div>
            <div>
              <h3 className="font-semibold">Free Delivery</h3>
              <span className="text-gray-600 text-sm font-medium">Orders $50 or more</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md px-3 py-4 flex items-center gap-2">
            <div className="icon min-w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="text-lg text-primary-600"
              />
            </div>
            <div>
              <h3 className="font-semibold">30 Days Return</h3>
              <span className="text-gray-600 text-sm font-medium">Satisfaction guaranteed</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md px-3 py-4 flex items-center gap-2">
            <div className="icon min-w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-lg text-primary-600"
              />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <span className="text-gray-600 text-sm font-medium">100% protected checkout</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md px-3 py-4 flex items-center gap-2">
            <div className="icon min-w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center">
              <FontAwesomeIcon
                icon={faHeadset}
                className="text-lg text-primary-600"
              />
            </div>
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <span className="text-gray-600 text-sm font-medium">Ready to help anytime</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
