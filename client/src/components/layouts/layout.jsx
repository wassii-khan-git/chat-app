import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar";
import Login from "../login";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
