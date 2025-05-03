import React from "react";
import Navbar from "../components/common/navbar";
import Chat from "../components/chat";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
        <h1 className="text-center text-4xl font-bold text-indigo-500">
          Realtime Chat App
        </h1>
        <p className="text-center text-gray-500 mt-2">
          This is a simple chat application.
        </p>
        <Chat />
      </main>
    </>
  );
};

export default Home;
