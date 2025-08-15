import { useContext, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  faCircleInfo,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../context/Auth.context";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function VerifyEmail() {
  const inputsRef = useRef([]);
  const [error, setError] = useState(null);
  const { SendResetCodeToEmail, email, SendingVerificationCode } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const validationSchema = yup.object({
    digit0: yup.string().required(),
    digit1: yup.string().required(),
    digit2: yup.string().required(),
    digit3: yup.string().required(),
    digit4: yup.string().required(),
    digit5: yup.string().required(),
  });

  async function handelVerificationCode(values) {
    const finalCode = Object.values(values).join("");
    const sendingCode = {
      resetCode: finalCode,
    };

    // * Call API to send code

    try {
      const response = await SendingVerificationCode(sendingCode);
      if (response.success) {
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);

        setError(null);
      }
    } catch (error) {
      setError(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      digit0: "",
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
    },

    //validationSchema,

    onSubmit: handelVerificationCode,
  });

  function handleChange(e, index) {
    const val = e.target.value.replace(/\D/, "");
    if (!val) return;

    formik.setFieldValue(`digit${index}`, val[0]);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  }

  function handleBackspace(e, index) {
    if (e.key === "Backspace") {
      e.preventDefault();

      const currentValue = formik.values[`digit${index}`];

      if (currentValue) {
        formik.setFieldValue(`digit${index}`, "");
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        formik.setFieldValue(`digit${index - 1}`, "");
      }
    }
  }

  const isAllFilled = Object.values(formik.values).every((val) => val !== "");

  // ^ User didn't receive the code
  async function resendCodeToEmail() {
    const values = {
      email,
    };

    await SendResetCodeToEmail(values);
  }

  if (!email) {
    return <Navigate to="/forget-password" />;
  }

  return (
    <>
      <PageMetaData title="Verify Email" />
      <section className="py-15 bg-gray-50">
        <div className="max-w-96 mx-auto bg-white p-6 shadow rounded-lg space-y-4">
          <div className="icon size-14 text-xl mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
          <h2 className="text-xl font-semibold text-center">
            Verify Reset Code
          </h2>
          <p className="text-gray-700 text-center text-sm">
            We've sent a verification code to your email address.
          </p>
          <p className="text-center text-xs text-primary-600 -mt-2 font-semibold">
            {email}
          </p>

          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <p className="text-gray-700 text-center text-sm mb-3">
              Enter 6-digit verification code
            </p>
            <div className="flex gap-2 justify-center items-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  name={`digit${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="size-10 text-center text-gray-800 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={formik.values[`digit${index}`]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              ))}
            </div>
            <p className="text-center text-sm text-red-500 mt-5">
              <FontAwesomeIcon icon={faCircleInfo} /> Code expires in 10 minutes
            </p>

            <button
              type="submit"
              disabled={!isAllFilled}
              className={`${
                isAllFilled
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "bg-gray-300 cursor-not-allowed"
              } mt-5 w-full  py-3 px-4 text-white rounded-lg transition-colors duration-200`}
            >
              Verify Code
            </button>
          </form>

          <p className="text-center mt-6 text-sm">Didn't receive the code ?</p>
          <p
            className="text-center text-primary-600 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
            onClick={resendCodeToEmail}
          >
            Resend Code
          </p>

          <p className="text-center mt-3 text-sm">
            <Link
              to={"/login"}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Back to Sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
