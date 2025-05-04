import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar";
import Login from "../login";

const ChatLayout = () => {
  return (
    <>
      <Navbar />
      <Login />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default ChatLayout;
