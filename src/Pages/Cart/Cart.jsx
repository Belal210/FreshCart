import {
  faCartShopping,
  faShieldHalved,
  faTrashAlt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "../../Components/CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router";
import CartSkeleton from "../../Components/skeleton/CartSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Cart() {
  const { cartInfo, isLoading, handleClearingCart } = useContext(CartContext);

  if (isLoading) {
    return <CartSkeleton />;
  }

  const { data, numOfCartItems } = cartInfo;
  const { products, totalCartPrice } = data;

  return (
    <>
      <PageMetaData title="Shopping Cart" />
      <main className="py-8 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-lg">
                <div className="p-5 border-b border-gray-300 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Shopping Cart</h1>
                    <p className="mt-1 text-sm md:text-[16px] text-gray-600">
                      {numOfCartItems} items in your cart
                    </p>
                  </div>
                  {products.length > 0 && <button
                    className="px-2 md:px-3 py-2 bg-red-600 text-white rounded-md text-[10px] md:text-sm hover:bg-red-700 transition-colors duration-300"
                    onClick={handleClearingCart}
                  >
                    Clear Cart
                    <FontAwesomeIcon icon={faTrashAlt} className="ml-2" />
                  </button>}
                </div>

                {products.length > 0 ? (
                  products.map((product) => (
                    <CartItem key={product._id} productInfo={product} />
                  ))
                ) : (
                  <div className="py-10 text-center text-lg space-y-2">
                    <p>
                      Your cart is empty{" "}
                      <FontAwesomeIcon icon={faCartShopping} />{" "}
                    </p>
                    <p>
                      You can continue shopping from{" "}
                      <Link
                        to={"/"}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        here
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({numOfCartItems} items)
                    </span>
                    <span>{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{products.length > 0 ? 70 : 0} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{Math.trunc(totalCartPrice * 0.1)} EGP</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 py-4 font-semibold">
                    <span className="text-gray-600">Total</span>
                    <span>
                      {Math.trunc(
                        totalCartPrice +
                          (products.length > 0 ? 70 : 0) +
                          totalCartPrice * 0.1
                      )}{" "}
                      EGP
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to={"/checkout"}
                      className="btn w-full text-center font-medium border border-primary-600 text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link
                      to={"/"}
                      className="btn w-full text-center font-medium border border-gray-200 bg-white hover:bg-gray-100"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                <div className="bg-primary-50 shadow-sm shadow-primary-100 p-3 mb-3">
                  <div className="space-x-2 mb-1">
                    <FontAwesomeIcon
                      icon={faTruckFast}
                      className="text-primary-600"
                    />
                    <span className="font-semibold">Free Delivery</span>
                  </div>
                  <p className="text-sm">
                    Your order qualifies for free delivery. Estimated delivery.
                    2-3 business days
                  </p>
                </div>
                <div className="bg-primary-50 shadow-sm shadow-primary-100 p-3">
                  <div className="space-x-2 mb-1">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-primary-600"
                    />
                    <span className="font-semibold">Secure Checkout</span>
                  </div>
                  <p className="text-sm">
                    Your payment information is protected with 256-bit SSL
                    encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
