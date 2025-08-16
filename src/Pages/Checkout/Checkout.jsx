import {
  faCcAmex,
  faCcApplePay,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faChevronLeft,
  faCircleInfo,
  faCreditCard,
  faLock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { createOrder } from "../../services/payment-service";
import { toast } from "react-toastify";

export default function Checkout() {
  const [error , setError] = useState(null)
  
  const { cartInfo, isLoading, setCartInfo } = useContext(CartContext);
  const navigate = useNavigate();

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;

  const validationSchema = yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    shippingAddress: yup.object({
      details: yup.string().required("Address is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(phoneRegex, "Phone number is invalid"),
      city: yup.string().required("City is required"),
    }),
  });

  async function handleCreatingOrder(values) {
    try {
      const response = await createOrder({
        cartId,
        paymentMethod: values.paymentMethod,
        shippingAddress: values.shippingAddress,
      });

      if (response.success) {
        if (response.data.session) {
          toast.loading(
            "You will be directed to strip to complete payment proccess"
          );

          setTimeout(() => {
            location.href = response.data.session.url;
          }, 2000);
        } else {
          toast.success("Your order has been created successfully");
          setCartInfo({
            numOfCartItems: 0,
            data: {
              products: [],
              totalCartPrice: 0,
            },
          });

         
        }

         setTimeout(() => {
            navigate("/account/orders");
          }, 2500);
      }
    } catch (error) {
      setError(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      paymentMethod: "online",
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    validationSchema,

    onSubmit: handleCreatingOrder,
  });

  function handlePaymentChange(e) {
    formik.setFieldValue("paymentMethod", e.target.value);
  }

  if (isLoading) return <Loading />;

  const { data, cartId } = cartInfo;
  const { products, totalCartPrice } = data;

  return (
    <>
      <section className="bg-gray-50 ">
        <div className="container py-6 lg:max-w-6xl">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="payment-method w-[21rem] md:w-full mx-auto lg:col-span-2">
                <div>
                  <div className="payment-options bg-white shadow-sm p-3 md:p-5 mb-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="">
                      <label
                        htmlFor="cod"
                        className={`${
                          formik.values.paymentMethod === "cod" &&
                          "bg-primary-50 border-primary-600"
                        } flex gap-4 border border-gray-200 p-4 rounded-lg hover:border-primary-500 transition-colors duration-200`}
                      >
                        <input
                          type="radio"
                          id="cod"
                          name="payment-method"
                          value={`cod`}
                          className="size-4"
                          checked={formik.values.paymentMethod === "cod"}
                          onChange={(e) => handlePaymentChange(e)}
                        />
                        <div className="w-full">
                          <div className="max-w-full flex items-center justify-between">
                            <div className="flex items-center gap-2 lg:gap-3">
                              <FontAwesomeIcon
                                icon={faMoneyBillWave}
                                className="text-xl lg:text-2xl text-primary-600"
                              />
                              <div>
                                <h3 className="font-semibold mb-1 text-xs sm:text-sm lg:text-[16px]">
                                  Cash on Delivery
                                </h3>
                                <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm">
                                  Pay when your order arrives
                                </p>
                              </div>
                            </div>
                            <span className="text-primary-600 text-[10px] sm:text-xs lg:text-sm">
                              No extra charges
                            </span>
                          </div>

                          {formik.values.paymentMethod === "cod" && (
                            <div className="flex items-center gap-2 bg-primary-100 text-primary-600 p-2 border border-primary-500 rounded-md lg:ml-10 mt-2">
                              <FontAwesomeIcon icon={faCircleInfo} className="text-sm lg:text-[16px]" />
                              <p className="text-[10px] sm:text-xs lg:text-sm">
                                Please keep exact change ready for hassle-free
                                delivery
                              </p>
                            </div>
                          )}
                        </div>
                      </label>

                      <label
                        htmlFor="online"
                        className={`${
                          formik.values.paymentMethod === "online" &&
                          "bg-primary-50 border-primary-600"
                        } mt-5 flex gap-4 border border-gray-200 p-4 rounded-lg hover:border-primary-500 transition-colors duration-200`}
                      >
                        <input
                          type="radio"
                          id="online"
                          name="payment-method"
                          value={`online`}
                          className="size-4"
                          checked={formik.values.paymentMethod === "online"}
                          onChange={(e) => handlePaymentChange(e)}
                        />
                        <div className="w-full">
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                className="text-xl lg:text-2xl text-primary-600"
                              />
                              <div>
                                <h3 className="font-semibold mb-1 text-xs sm:text-sm lg:text-[16px]">
                                  Online Payment
                                </h3>
                                <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm">
                                  Pay securely with card or digital wallet
                                </p>
                              </div>
                            </div>
                            <span className="text-primary-600 text-[10px] sm:text-xs lg:text-sm">
                              Recommended
                            </span>
                          </div>

                          {formik.values.paymentMethod === "online" && (
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-600 p-2 border border-blue-400 rounded-md lg:ml-10 mt-2">
                              <FontAwesomeIcon icon={faCircleInfo} className="text-sm lg:text-[16px]" />
                              <p className="text-[10px] sm:text-xs lg:text-sm">
                                You will be redirected to secure payment gateway
                                to compelete your transaction
                              </p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="shipping-address bg-white shadow-sm p-3 md:p-5 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">
                      Shipping Address
                    </h2>
                    <div className="address flex flex-col gap-2">
                      <label
                        htmlFor="address-details"
                        className="text-sm font-semibold"
                      >
                        Address Details :
                      </label>
                      <textarea
                        id="address-details"
                        name="shippingAddress.details"
                        placeholder="Enter Your Full Address Details"
                        className="form-control min-h-28 max-h-60"
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.errors.shippingAddress?.details &&
                        formik.touched.shippingAddress?.details && (
                          <p className="text-red-600 text-sm">
                            * {formik.errors.shippingAddress?.details}
                          </p>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 *:grow-1 mt-3">
                      <div className="phone flex flex-col gap-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-semibold"
                        >
                          Phone Number :
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="01028697049"
                          className="form-control"
                          name="shippingAddress.phone"
                          value={formik.values.shippingAddress.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.shippingAddress?.phone &&
                          formik.touched.shippingAddress?.phone && (
                            <p className="text-red-600 text-sm">
                              * {formik.errors.shippingAddress?.phone}
                            </p>
                          )}
                      </div>
                      <div className="city flex flex-col gap-2">
                        <label htmlFor="city" className="text-sm font-semibold">
                          City :
                        </label>
                        <input
                          type="text"
                          id="city"
                          placeholder="Cairo"
                          className="form-control"
                          name="shippingAddress.city"
                          value={formik.values.shippingAddress.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.shippingAddress?.city &&
                          formik.touched.shippingAddress?.city && (
                            <p className="text-red-600 text-sm">
                              * {formik.errors.shippingAddress?.city}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-summary w-[21rem] md:w-full mx-auto h-fit bg-white p-3 md:p-5 shadow-sm rounded-lg lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="cart-items p-2 max-h-48 overflow-auto space-y-3 border-b border-gray-200 pb-3">
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.product.id}`}
                      key={product._id}
                      className="item flex items-center gap-2 text-sm"
                    >
                      <img
                        src={product.product.imageCover}
                        alt="Product image"
                        className="size-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-xs font-semibold">
                          {product.product.title}
                        </h3>
                        <span className="text-xs">Qty : {product.count}</span>
                      </div>
                      <span className="ms-auto text-xs text-primary-600">
                        {product.price} EGP
                      </span>
                    </Link>
                  ))}
                </div>
                <ul className="*:flex *:justify-between *:items-center py-3 space-y-3 mb-3">
                  <li>
                    <span>Subtotal</span>
                    <span>{totalCartPrice} EGP</span>
                  </li>
                  <li>
                    <span>Delivery</span>
                    <span>70 EGP</span>
                  </li>
                  <li>
                    <span>Tax</span>
                    <span>{Math.trunc(totalCartPrice * 0.1)} EGP</span>
                  </li>
                  <li className="total font-semibold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span>
                      {Math.trunc(totalCartPrice + 70 + totalCartPrice * 0.1)}{" "}
                      EGP
                    </span>
                  </li>
                </ul>

                <div className="btn-group mb-5">
                  <button
                    type="submit"
                    className="btn bg-primary-600 flex justify-center items-center gap-2 w-full text-white font-medium text-sm border border-primary-600 hover:bg-primary-700"
                  >
                    <span>Proceed to Payment</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <Link
                    to={"/cart"}
                    className="btn flex justify-center items-center bg-white border border-gray-400 gap-2 w-full font-medium text-sm mt-3 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>Previous Step</span>
                  </Link>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Secure Checkout</h3>
                  <p className="text-gray-600 text-sm">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-primary-600 me-2"
                    />
                    Your payment information is secure
                  </p>

                  <div className="flex items-center mt-4 space-x-2">
                    <FontAwesomeIcon
                      icon={faCcVisa}
                      className="text-2xl text-blue-700"
                    />
                    <FontAwesomeIcon
                      icon={faCcMastercard}
                      className="text-2xl text-red-500"
                    />
                    <FontAwesomeIcon
                      icon={faCcAmex}
                      className="text-2xl text-blue-500"
                    />
                    <FontAwesomeIcon
                      icon={faCcPaypal}
                      className="text-2xl text-blue-800"
                    />
                    <FontAwesomeIcon
                      icon={faCcApplePay}
                      className="text-2xl text-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
