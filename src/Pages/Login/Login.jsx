import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faEnvelope,
  faLock,
  faShieldHalved,
  faStar,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { sendDataToLogIn } from "../../services/auth-services";
import shoppingCartImg from "../../assets/images/login-img.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth.context";

export default function Login() {
  
  const location = useLocation()
  const from = location?.state?.from || "/"  
  
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate();
  const [isExistError, setIsExistError] = useState(null);
  const [shownPassword, setShownPassword] = useState(false)

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = yup.object({
    email: yup.string().required("Email is required.").email("Email must be a valid."),

    password: yup
      .string()
      .required("Password is required.")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."
      ),
  });

  async function handleLogIn(values) {
    
    try {
      const response = await sendDataToLogIn(values);

      if (response.success) {
        toast.success("Welcome Back!");
        setToken(response.data.token)
        
        if(values.rememberMe) {
          localStorage.setItem("token" , response.data.token)
        } else {
          sessionStorage.setItem("token" , response.data.token)
        }
      }
      setTimeout(() => {
        navigate(from);
      }, 3000);
    } catch (error) {
      setIsExistError(error.message);
    }    
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validationSchema,

    onSubmit: handleLogIn,
  });

  function handleInputChange(e) {
    if(isExistError) {
      setIsExistError(null)
    }

    formik.handleChange(e)
  }

  return (
    <>
      <main className="bg-gray-50">
        <div className="container py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side */}
            <div className="hidden lg:block ">
              <div className="text-center space-y-6">
                <img
                  src={shoppingCartImg}
                  alt="shopping cart"
                  className="w-full h-96 object-cover shadow-lg rounded-2xl"
                />
                <div className="space-y-4">
                  <h2 className="text-3xl text-gray-800 font-bold">
                    Fresh Groceries Delivered
                  </h2>
                  <p className="text-lg text-gray-600">
                    Join thousands of happy customers who trust FreshCart for
                    their daily grocery needs
                  </p>
                  <div className="flex justify-center items-center text-sm text-gray-500 space-x-8">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-primary-600 mr-2"
                      />
                      Free Delivery
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        className="text-primary-600 mr-2"
                      />
                      Secure Payment
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-primary-600 mr-2"
                      />
                      24/7 Support
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (Form) */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center mb-4">
                    <span className="text-3xl text-primary-600 font-bold">
                      Fresh<span className="text-gray-800">Cart</span>
                    </span>
                  </div>
                  <h1 className="text-gray-800 text-2xl mb-2">Welcome Back!</h1>
                  <p className="text-gray-600">
                    Sign in to continue your fresh shopping experience
                  </p>
                </div>

                <div className="space-y-3 mb-6 *:space-x-3 *:hover:bg-gray-100">
                  <button className="btn bg-transparent border-2 w-full border-gray-400/40">
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="text-red-500 md:text-lg"
                    />
                    <span className="font-medium text-sm md:text-[16px] text-gray-700">
                      Continue with Google
                    </span>
                  </button>
                  <button className="btn bg-transparent border-2 w-full border-gray-400/40">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-blue-600 md:text-lg"
                    />
                    <span className="font-medium text-sm md:text-[16px] text-gray-700">
                      Continue with Facebook
                    </span>
                  </button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-gray-500 bg-white font-medium">
                      OR CONTINUE WITH EMAIL
                    </span>
                  </div>
                </div>

                <form
                  className="space-y-5"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="email">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>

                    {formik.touched.email && formik.errors?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="password">
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-semibold"
                      >
                        Password
                      </label>
                      <Link
                        to={"/forget-password"}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        Forgot Password ?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type={shownPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-13 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                      />
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={()=> {setShownPassword(!shownPassword)}}
                      >
                        {shownPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors?.password && (
                      <p className="text-red-500 text-sm mt-1">
                        * {formik.errors.password}
                      </p>
                    )}

                    {isExistError && (<p className="text-red-500 mt-1">
                        * {isExistError}
                      </p>)}
                  </div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="rememberMe" className="flex items-center">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        className="size-4 accent-primary-600"
                        value={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="text-sm text-gray-700 ml-3">
                        Keep me signed in
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 py-3 px-4 text-white rounded-xl"
                  >
                    Sign In
                  </button>
                </form>
                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-gray-600">
                    New to FreshCart ?
                    <Link
                      to={"/signup"}
                      className="font-semibold text-primary-600 hover:text-primary-700 ms-2"
                    >
                      Create an Account
                    </Link>
                  </p>
                </div>
                <div className="flex justify-center items-center space-x-6 mt-6 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faLock} className="mr-1" />
                    SSL Secured
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    50K+ Users
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faStar} className="mr-1" />
                    4.9 Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
