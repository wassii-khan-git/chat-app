import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar";
import Footer from "../common/footer";

const ChatLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default ChatLayout;
