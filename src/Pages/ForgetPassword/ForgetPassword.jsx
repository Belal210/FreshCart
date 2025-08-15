import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faPaperPlane,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import { AuthContext } from "../../context/Auth.context";

export default function ForgetPassword() {
  const [error, setError] = useState(null);
  const { SendResetCodeToEmail } = useContext(AuthContext);

  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be a valid."),
  });

  async function SendingCodeAndNavigateUser(values) {
    try {
      const response = await SendResetCodeToEmail(values);
      if (response.success) {
        setTimeout(() => {
          navigate("/verify-email");
        }, 2000);
      }
    } catch (error) {
      setError(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: (values) => SendingCodeAndNavigateUser(values),
  });

  return (
    <>
      <PageMetaData title="Forget Password" />
      <section className="py-15 bg-gray-50">
        <div className="max-w-96 mx-auto bg-white p-6 shadow rounded-lg space-y-4">
          <div className="icon size-14 text-xl mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <h2 className="text-xl font-semibold text-center">
            Forgot your password ?
          </h2>
          <p className="text-gray-700 text-center text-sm">
            No worries! Enter your email address and we'll send you a code
            to reset your password.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your registered email"
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {formik.touched.email && formik.errors?.email && (
                <p className="text-red-500 mt-2 text-sm">
                  * {formik.errors.email}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-primary-600 hover:bg-primary-700 py-3 px-4 text-white rounded-lg transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <span className="ms-2">Send Reset Code</span>
            </button>
          </form>
          <p className="text-center mt-2">
            Remember your password ?{" "}
            <Link
              to={"/login"}
              className="text-primary-600 hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-5 max-w-96 mx-auto rounded-lg border-2 border-gray-200 p-3">
          <div className="space-x-2 mb-1">
            <FontAwesomeIcon
              icon={faShieldHalved}
              className="text-primary-600"
            />
            <span className="font-semibold">Security Notice</span>
          </div>
          <p className="text-sm">
            For your security, a password reset code will be sent to your
            registered email address. The code will expire in 10 minutes.
          </p>
        </div>
      </section>
    </>
  );
}
