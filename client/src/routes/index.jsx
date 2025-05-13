import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Layout from "../components/layouts/layout";
import Chat from "../components/chat";
import Login from "../components/login";
import { useAuth } from "../hooks/index";
import CreateAccount from "../components/create-account";

const CustomRoute = () => {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [auth]);

  useEffect(() => {
    // if user is logged in
    if (auth?.token) {
      navigate("/dashboard");
    }
  }, [auth]);

  // Doctor routes
  const DashboardRoutes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Chat />,
        },
      ],
    },
    { path: "*", element: <h1>Not Found</h1> },
  ]);

  // Default routes
  const DefaultRoutes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <CreateAccount /> },
      ],
    },
    { path: "*", element: <h1>Not Found</h1> },
  ]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      {auth?.token ? DashboardRoutes : DefaultRoutes}
    </Suspense>
  );
};
export default CustomRoute;
