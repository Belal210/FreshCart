import { useFormik } from "formik";
import * as yup from "yup";
import image from "../../assets/images/undraw_server-push_1lbi.svg";
import { updateUserdata } from "../../services/auth-services";
import { toast } from "react-toastify";
import { useState } from "react";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";


export default function UpdateUserData() {
  const [error, setError] = useState(null);

  const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;

  const validationSchema = yup.object({
    name: yup.string().required("Name is required."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be a valid."),
    phone: yup
      .string()
      .required("Phone is required.")
      .matches(phoneRegex, "We accept egyption phone numbers only."),
  });

  async function handleUpdatingUserData(values) {
    try {
      const response = await updateUserdata(values);

      if (response.success) {
        toast.success("Your Data has been updated successfuly");
      }
    } catch (error) {
      setError(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema,

    onSubmit: handleUpdatingUserData,
  });
  
  function handleInputChange(e) {
    if(error) {
        setError(null)
    }

    formik.handleChange(e)
  }

  return (
    <>
    <PageMetaData title="Update Data"/>
      <section className="py-8">
        
        <div className="flex items-center gap-5 py-8">
          <div className="image w-1/2 hidden lg:block">
            <img src={image} alt="Updata data image" className="w-full" />
          </div>

          <form
            className="w-full md:w-3/4 lg:w-1/2 mx-auto space-y-4 shadow-md rounded-md p-5"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-lg text-center font-semibold mb-4">Update Your Data</h2>
            <div className="name flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-700">
                Name :
              </label>
              <input
                className="form-control placeholder:text-sm"
                type="text"
                name="name"
                id="name"
                placeholder="Your new name"
                value={formik.values.name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">* {formik.errors.name}</p>
              )}
            </div>

            <div className="email flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-700">
                Email :
              </label>
              <input
                className="form-control placeholder:text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="Your new email"
                value={formik.values.email}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">* {formik.errors.email}</p>
              )}
            </div>

            <div className="phone flex flex-col gap-1">
              <label htmlFor="phone" className="text-gray-700">
                Phone :
              </label>
              <input
                className="form-control placeholder:text-sm"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Your new phone"
                value={formik.values.phone}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">* {formik.errors.phone}</p>
              )}

              {error && (
                <p className="text-red-500 text-sm">
                  * There is an error, check your data or try again
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-5 py-2 rounded-md text-white bg-primary-600 flex justify-center items-center gap-2 w-full hover:bg-primary-700 transition-colors duration-300"
            >
              Update Data
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
