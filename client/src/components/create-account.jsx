import React from "react";

const CreateAccount = () => {
  return (
    <form action="" className="mt-5">
      <div className="w-full text-center md:w-[30rem] mx-auto bg-white p-7 rounded-lg shadow-md">
        {/* Add chat messages and input here */}
        <div className="w-full mb-4">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="w-full mb-4">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            className="border border-gray-300 rounded-md  px-3 py-2 w-full"
          />
        </div>
        <div className="w-full mt-3">
          <button
            type="submit"
            className="bg-indigo-500 text-white  px-3 py-2 rounded-md w-full hover:bg-indigo-600 transition duration-200 ease-in-out"
          >
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;
