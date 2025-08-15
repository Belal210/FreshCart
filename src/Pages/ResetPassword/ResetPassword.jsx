import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, Navigate, useNavigate } from "react-router";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function ResetPassword() {
  const [shownPassword, setShownPassword] = useState(false);
  const [error, setError] = useState(null);
  const { email, handleResetPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = yup.object({
    newPassword: yup
      .string()
      .required("Password is required.")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."
      ),
  });

  async function handleResetNewPassword(values) {
    try {
      const response = await handleResetPassword(values);
      if (response.success) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
    },

    validationSchema,
    onSubmit: handleResetNewPassword,
  });

  if (!email) {
    return <Navigate to="/forget-password" />;
  }

  return (
    <>
      <PageMetaData title="Reset Password" />
      <section className="py-15 bg-gray-50">
        <div className="max-w-96 mx-auto bg-white p-6 shadow rounded-lg space-y-4">
          <div className="icon size-14 text-xl mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <h2 className="text-xl font-semibold text-center">Reset Password</h2>
          <p className="text-gray-700 text-center text-sm">
            Enter your new password to reset your account password
          </p>

          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={shownPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-16 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setShownPassword(!shownPassword);
                }}
              >
                {shownPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors?.newPassword && (
              <p className="text-red-500 mt-2 text-sm">
                * {formik.errors.newPassword}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-2">
                An error occurred. Please try again
              </p>
            )}

            <button
              type="submit"
              className="mt-5 w-full bg-primary-600 hover:bg-primary-700 py-3 px-4 text-white rounded-lg transition-colors duration-200"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center mt-5">
            Remember your password ?{" "}
            <Link
              to={"/login"}
              className="text-primary-600 hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
