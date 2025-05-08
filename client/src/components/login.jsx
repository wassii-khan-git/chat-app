import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginApi } from "../services/auth/auth.services";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { notify } from "../utils/helper";

// Login account
const Login = () => {
  const { auth, setAuth } = useAuth();
  console.log("auth", auth);

  // navigate
  const navigate = useNavigate();

  // create account mutation
  const { mutate: loginAccount, isPending } = useMutation({
    mutationFn: (values) => LoginApi(values),
    onSuccess: (response) => {
      console.log("response: ", response);
      if (response.success) {
        setAuth({ user: response?.user, token: response?.user?.token });
        // notify
        notify(response.message, true);
        // navigate
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
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
        email: "john@gmail.com",
        password: "123456",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("email is required"),
        password: Yup.string().required("password is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        loginAccount(values, {
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
            {/* password input */}
            <div className="w-full mb-4">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className={`${
                  touched.password && errors.password && "border-red-500"
                } border border-gray-300 rounded-md px-3 py-2 w-full`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <div className="text-left capitalize mt-2 text-sm text-red-500">
                  {errors.password}
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
                {isPending ? "Loading..." : "Login"}
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
