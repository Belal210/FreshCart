import {
  faShieldHalved,
  faStar,
  faTruckFast,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reviewauthorImg from "../../assets/images/author-review.png";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { checkPasswordStrength } from "../../utils/password-utils";
import { sendDataToSignUp } from "../../services/auth-services";
import Rating from "../../Components/Rating/Rating";

export default function Signup() {
  const navigate = useNavigate();
  const [isExistError, setIsExistError] = useState(null);

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = yup.object({
    name: yup.string().required("Name is required."),
    email: yup.string().required("Email is required.").email("Email must be a valid."),
    phone: yup
      .string()
      .required("Phone is required.")
      .matches(phoneRegex, "We accept egyption phone numbers only."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."
      ),
    rePassword: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("password")], "Passwords should be the same."),
    terms: yup.boolean().oneOf([true], "You must agree to our terms."),
  });

  async function handleSignUp(values) {
    try {
      const response = await sendDataToSignUp(values);

      if (response.success) {
        toast.success("You have signed up successfully");
      }

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
      setIsExistError(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
      terms: false,
    },

    validationSchema,

    onSubmit: handleSignUp,
  });

  const passwordStrength = checkPasswordStrength(formik.values.password);

  return (
    <>
      <main className="py-12 bg-gray-50">
        <div className="container grid lg:grid-cols-2 lg:gap-12">
          {/* Left side */}
          <div className="space-y-8 py-10">
            <div className="welcome-msg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h2>
              <p className="md:text-lg mt-2">
                Join thousands of happy customers who enjoy fresh groceries
                delivered to thier doorstep.
              </p>
            </div>

            <ul className="space-y-5 *:flex *:items-center *:gap-3">
              <li>
                <div className="icon size-12 rounded-full text-lg md:text-xl bg-primary-200 text-primary-600 flex justify-center items-center">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="content text-sm md:text-[16px]">
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-gray-600">
                    Premium quality products sourced from trust suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 rounded-full text-lg md:text-xl bg-primary-200 text-primary-600 flex justify-center items-center">
                  <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <div className="content text-sm md:text-[16px]">
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 rounded-full text-lg md:text-xl bg-primary-200 text-primary-600 flex justify-center items-center">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div className="content text-sm md:text-[16px]">
                  <h3 className="font-semibold">Secure Shopping</h3>
                  <p className="text-gray-600">
                    Your datavand payments are completely secure
                  </p>
                </div>
              </li>
            </ul>

            <div className="review bg-white text-sm md:text-[16px] p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3">
                <img
                  className="size-10 md:size-12 rounded-full"
                  src={reviewauthorImg}
                  alt="Sarah Johnson Profile Image"
                />
                <div>
                  <h3>Sarah Johnson</h3>
                  <Rating rating={5}/>
                </div>
              </div>
              <blockquote className="italic text-gray-700 mt-4">
                <p>
                  "FreshCart has transformed my shopping experience. The quality
                  of the products is outstanding, and the delivery is always on
                  time. Highly recommend!"
                </p>
              </blockquote>
            </div>
          </div>
          {/* Right side (Form) */}
          <div className="p-10 space-y-8 bg-white rounded-xl shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">Create Your Account</h2>
              <p className="mt-1">Start your fresh journey with us todey</p>
            </div>

            <div className="flex gap-2 *:flex *:items-center *:justify-center *:gap-2 *:w-full *:hover:bg-gray-100">
              <button className="btn bg-transparent border border-gray-400/40">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="btn bg-transparent border border-gray-400/40">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative w-full h-0.5 bg-gray-300/30">
              <span className="bg-white px-4 absolute left-1/2 top-1/2 -translate-1/2">
                or
              </span>
            </div>

            <form
              className="space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <div className="name flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-700 text-sm font-semibold">Name :</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ahmed"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">* {formik.errors.name}</p>
                )}
              </div>

              <div className="email flex flex-col gap-1">
                <label htmlFor="email" className="text-gray-700 text-sm font-semibold">Email :</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="ahmed@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">* {formik.errors.email}</p>
                )}

                {isExistError && (
                  <p className="text-red-500 text-sm">*{isExistError}.</p>
                )}
              </div>

              <div className="phone flex flex-col gap-1">
                <label htmlFor="phone" className="text-gray-700 text-sm font-semibold">Phone :</label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="+2 010 7653 1894"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm">* {formik.errors.phone}</p>
                )}
              </div>

              <div className="password flex flex-col gap-1">
                <label htmlFor="password" className="text-gray-700 text-sm font-semibold">Password :</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="create a strong password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.values.password != "" && <div className="password-strength flex items-center gap-2 mt-1">
                  <div className="bar w-full h-1 rounded-xl bg-gray-200 overflow-hidden">
                    <div
                      className={`progress ${passwordStrength.width} h-full ${passwordStrength.background}`}
                    ></div>
                  </div>
                  <span className="text-nowrap w-28 text-sm md:text-[16px] text-center">
                    {passwordStrength.text}
                  </span>
                </div>}

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">* {formik.errors.password}</p>
                )}
              </div>

              <div className="rePassword flex flex-col gap-1">
                <label htmlFor="rePassword" className="text-gray-700 text-sm font-semibold">Confirm Password :</label>
                <input
                  className="form-control"
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  placeholder="confirm your password"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500 text-sm">* {formik.errors.rePassword}</p>
                )}
              </div>

              <div className="terms">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="size-4 accent-primary-600"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="terms" className="text-xs md:text-sm xl:text-[16px]">
                    I agree to the{" "}
                    <Link className="text-primary-600 underline">
                      Terms of Services
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-primary-600 underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-red-500 mt-1">* {formik.errors.terms}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn text-white bg-primary-600 flex justify-center items-center gap-2 w-full hover:bg-primary-700"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Create My Account</span>
              </button>
            </form>

            <p className="text-center pt-8 border-t border-gray-300/50">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
