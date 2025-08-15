import {
  faBox,
  faCheck,
  faClock,
  faCreditCard,
  faEye,
  faRotateRight,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserOrders } from "../../services/orders-service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { Link } from "react-router";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import OrdersSkeleton from "../../Components/skeleton/OrdersSkeleton";

export default function Orders() {
  const { userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      setIsLoading(true);
      const response = await getUserOrders({ userId: userInfo.id });

      if (response.success) {
        setIsLoading(false);
        setOrders(response?.data);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  return (
    <>
      <PageMetaData title="Orders" />
      <section className="">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {orders?.length === 0 && (
          <div className="text-center py-10 space-y-2">
            <div className="icon text-gray-300 text-6xl">
              <FontAwesomeIcon icon={faBox} />
            </div>
            <p className="text-lg font-semibold">No orders found</p>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
            <Link
              to={"/"}
              className="mt-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {orders?.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 overflow-auto rounded-lg mb-4"
          >
            <div className="bg-gray-50 p-3 flex justify-between items-center border-b border-gray-200">
              <div className="flex gap-3 items-start">
                <div className="mr-2">
                  <p className="text-[10px] sm:text-xs lg:text-sm">
                    Order #{order.id}
                  </p>
                  <span className="text-[8px] lg:text-xs text-gray-500 mt-1">
                    Placed on
                  </span>
                </div>

                {order.isPaid ? (
                  <div className="bg-primary-100 text-primary-600 p-1 rounded-sm text-[8px] lg:text-xs space-x-1">
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Paid</span>
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-600 p-1 rounded-sm text-[8px] lg:text-xs space-x-1">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Unpaid</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-3 text-[8px] md:text-xs lg:text-sm">
                <button className="text-primary-600 space-x-1">
                  <FontAwesomeIcon icon={faRotateRight} />
                  <span>Reorder</span>
                </button>
                <button className="space-x-1">
                  <FontAwesomeIcon icon={faEye} />
                  <span>View Details</span>
                </button>
              </div>
            </div>

            <div className="p-2 md:p-3 flex gap-8 lg:gap-0 lg:justify-between">
              
                <div className="images flex flex-col xl:flex-row gap-1 pr-2 lg:pr-3 border-r border-gray-400">
                  {order.cartItems?.slice(0, 3).map((item) => (
                    <div
                      key={item._id}
                      className="relative size-12 lg:size-14 bg-gray-100 rounded overflow-hidden"
                    >
                      <img
                        src={item?.product?.imageCover}
                        alt="Product image"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="size-4 text-xs text-white bg-gray-800 flex justify-center items-center absolute top-0 right-0">
                        {item?.count}
                      </span>
                    </div>
                  ))}
                </div>
              

              <div className="flex flex-col items-center md:flex-row gap-5 xl:gap-15">
                <div className="flex justify-baseline md:justify-between gap-2 lg:gap-3 xl:gap-5">
                  <div className="flex flex-col justify-start items-center text-[8px] md:text-[10px] lg:text-sm">
                    <span className="text-gray-500 mb-1 md:mb-2">items</span>
                    <span>{order?.cartItems?.length} items</span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-[8px] md:text-[10px] lg:text-sm">
                    <span className="text-gray-500 mb-1 md:mb-2">Total Amount</span>
                    <span>{order?.totalOrderPrice} EGP</span>
                  </div>

                  <div className="flex flex-col justify-center gap-1 md:pr-2 lg:pr-4 md:border-r border-gray-400 text-[8px] md:text-[10px] lg:text-sm">
                    <span className="text-gray-500">Delivered to</span>
                    <span>{order.shippingAddress.city}</span>
                    <span className="text-primary-600 text-[7px] md:text-[8px] lg:text-xs">
                      on {new Date(order.createdAt).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-2 md:gap-3 ml-2 text-[10px] lg:text-sm *:transition-colors duration-200">
                  {order.isPaid ? (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <FontAwesomeIcon icon={faTruck} className="mr-1" />
                        Track Order
                      </button>
                      <button className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-200">
                        Cancel Order
                      </button>
                    </>
                  ) : (
                    <>
                      
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                        Reorder Items
                      </button>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                        <FontAwesomeIcon icon={faCreditCard} className="mr-1" />
                        Complete Payment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
