import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginApi } from "../services/auth/auth.services"; // Assuming correct path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default Toastify CSS
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/index"; // Assuming correct path
import { notify } from "../utils/helper"; // Assuming correct path

// Define a WhatsApp-like green accent c
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: loginAccount, isPending } = useMutation({
    mutationFn: (values) => LoginApi(values),
    onSuccess: (response) => {
      if (response.success && response.user) {
        setAuth({ user: response.user, token: response.user.token });
        notify(response.message || "Login successful!", true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Handle cases where success is true but no user/token, or success is false
        notify(response.message || "Login failed. Please try again.", false);
      }
    },
    onError: (error) => {
      // Safely access error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      notify(errorMessage, false);
    },
  });

  return (
    <div className="mt-20 dark:bg-slate-900  flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md  bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-200 mb-8">
          Sign In
        </h1>
        <Formik
          initialValues={{
            email: "", // Start with empty or common test email
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            loginAccount(values, {
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
              {/* Email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email" // Use type="email" for better semantics and mobile keyboards
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
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <Link // Optional: Forgot password link
                    type="button"
                    className={`text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300`}
                    onClick={() =>
                      notify("Sorry! we are working on this feature", false)
                    }
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
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
                  {isPending ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup" // Adjust to your signup route
            className={`font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300`}
          >
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Or "light" or "dark" based on your preference
      />
    </div>
  );
};

export default Login;
