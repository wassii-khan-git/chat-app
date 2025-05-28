import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateAccountApi } from "../services/auth/auth.services"; // Assuming correct path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default Toastify CSS
import Login from "./login"; // Assuming Login component is in the same directory or correct path
import { Link } from "react-router-dom";
import { notify } from "../utils/helper"; // Assuming correct path

// Define a consistent accent color (same as Login if desired)
const CreateAccount = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false); // Initial state false

  // Create account mutation
  const { mutate: createAccount, isPending } = useMutation({
    mutationFn: (values) => CreateAccountApi(values),
    onSuccess: (response) => {
      if (response.success) {
        notify(
          response.message || "Account created successfully! Please log in.",
          true
        );
        setIsAccountCreated(true);
      } else {
        // Handle cases where API might return success: false with a message
        notify(
          response.message || "Failed to create account. Please try again.",
          false
        );
        setIsAccountCreated(false); // Ensure it's false if creation wasn't fully successful
      }
    },
    onError: (error) => {
      setIsAccountCreated(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      notify(errorMessage, false);
    },
  });

  if (isAccountCreated) {
    // If account is created, render the Login component.
    // Login component should handle its own full-page styling.
    return <Login />;
  }

  return (
    <div className="mt-14 dark:bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-200 mb-8">
          Create Account
        </h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(3, "Username must be at least 3 characters")
              .required("Username is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            createAccount(values, {
              onSuccess: (apiResponse) => {
                if (apiResponse.success) {
                  resetForm();
                }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Choose a username"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border ${
                    touched.username && errors.username
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="•••••••• (min. 6 characters)"
                  className={`w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {isPending ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login" // Adjust to your login route
            className={`font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300`}
          >
            Sign In
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000} // Slightly longer for account creation messages
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default CreateAccount;
