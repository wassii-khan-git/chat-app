import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateAccountApi } from "../services/auth/auth.services";
import { ToastContainer, toast } from "react-toastify";
// Create account
const Login = () => {
  // toast alert
  const notify = (message, flag) => {
    flag === true ? toast.success(message) : toast.error(message);
  };
  // create account mutation
  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: (values) => CreateAccountApi(values),
    onSuccess: (response) => {
      console.log("response: ", response);
      if (response.success) {
        localStorage.setItem("auth", JSON.stringify(response));
        notify(response.message, true);
      }
    },
    onError: (error) => {
      console.log("error", error);
      notify(error.message, false);
    },
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("username is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("email is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        createAccount(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="w-full text-center md:w-[30rem] mx-auto bg-white p-7 rounded-lg shadow-md">
            {/* Email input */}
            <div className="w-full mb-4">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                className={`${
                  touched.email && errors.email && "border-red-500"
                } border border-gray-300 rounded-md px-3 py-2 w-full`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <div className="text-left capitalize mt-2 text-sm text-red-500">
                  {errors.email}
                </div>
              )}
            </div>
            {/* Username input */}
            <div className="w-full mb-4">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                className={`${
                  touched.username && errors.username && "border-red-500"
                } border border-gray-300 rounded-md px-3 py-2 w-full`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {touched.username && errors.username && (
                <div className="text-left capitalize mt-2 text-sm text-red-500">
                  {errors.username}
                </div>
              )}
            </div>
            {/* Submit button */}
            <div className="w-full mt-3">
              <button
                type="submit"
                disabled={isPending}
                className="bg-indigo-500 text-white px-3 py-2 rounded-md w-full hover:bg-indigo-600 transition duration-200 ease-in-out"
              >
                {isPending ? "Loading..." : "Create Account"}
              </button>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
