import { useContext, useState } from "react";
import image from "../../assets/images/undraw_enter-password_1kl4.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { changeUserPassword } from "../../services/auth-services";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth.context";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function ChangeUserPassword() {
  const [shownCurrentPassword, setShownCurrentPassword] = useState(false);
  const [shownNewPassword, setShownNewPassword] = useState(false);
  const [shownRePassword, setShownRePassword] = useState(false);
  const [error, setError] = useState(null);

  const {logOut} = useContext(AuthContext)


  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required("Password is required.")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character."
      ),
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
  });

  async function handleChangingPassword(values) {
    try {
      const response = await changeUserPassword(values);
      if(response.success) {
        toast.success("Your Password has been updated successfuly")

        setTimeout(()=>{
            logOut()
        } ,2500)

      }
    } catch (error) {
      setError(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },

    validationSchema,

    onSubmit: handleChangingPassword,
  });

  function handleInputChange(e) {
    if (error) {
      setError(null);
    }

    formik.handleChange(e);
  }

  return (
    <>
    <PageMetaData title="Change Password"/>
      <section className="py-8">
        
        <div className="flex items-center gap-5 py-8">
          <div className="image w-1/2 hidden lg:block">
            <img src={image} alt="Change password image" className="w-full" />
          </div>

          <div className="w-full md:w-3/4 lg:w-1/2 mx-auto shadow-md rounded-md p-5">
            <h2 className="text-lg text-center mb-4 font-semibold">Change Your Password</h2>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="currenPassword">
                <label htmlFor="currentPassword" className="text-gray-700">
                  Current Password :
                </label>
                <div className="relative mt-1">
                  <input
                    type={shownCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 placeholder:text-sm"
                    id="currentPassword"
                    name="currentPassword"
                    value={formik.values.currentPassword}
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
                    onClick={() => {
                      setShownCurrentPassword(!shownCurrentPassword);
                    }}
                  >
                    {shownCurrentPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                </div>

                {formik.touched.currentPassword &&
                  formik.errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      * {formik.errors.currentPassword}
                    </p>
                  )}
              </div>

              <div className="newPassword">
                <label htmlFor="password" className="text-gray-700">
                  New Password :
                </label>
                <div className="relative mt-1">
                  <input
                    type={shownNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 placeholder:text-sm"
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
                    onClick={() => {
                      setShownNewPassword(!shownNewPassword);
                    }}
                  >
                    {shownNewPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    * {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="rePassword">
                <label htmlFor="rePassword" className="text-gray-700">
                  Confirm Password :
                </label>
                <div className="relative mt-1">
                  <input
                    type={shownRePassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 placeholder:text-sm"
                    id="rePassword"
                    name="rePassword"
                    value={formik.values.rePassword}
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
                    onClick={() => {
                      setShownRePassword(!shownRePassword);
                    }}
                  >
                    {shownRePassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                </div>

                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500 text-sm mt-1">
                    * {formik.errors.rePassword}
                  </p>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm">
                  * There is an error, check your passwords or try again
                </p>
              )}
              <button
                type="submit"
                className="mt-5 py-2 rounded-md text-white bg-primary-600 flex justify-center items-center gap-2 w-full hover:bg-primary-700 transition-colors duration-300"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
