import { LeftOutlined } from "@ant-design/icons";
import React from "react";

const SingleChatRoom = ({ roomInfo, handleRoomCreation }) => {
  return (
    <div className="w-full md:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-3 bg-indigo-500 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-white">{roomInfo.name}</h2>
          <p className="text-indigo-100 text-sm mt-1">Online</p>
        </div>
        <div className="flex gap-4 text-indigo-100">
          <h2 className="cursor-pointer" onClick={handleRoomCreation}>
            <LeftOutlined className="mr-3 font-bold" />
            Go Back
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-gray-500 h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-indigo-50 to-gray-50">
        <h5 className="mb-5 ">
          <span className="bg-gray-300 text-[12px] font-medium px-4 py-2 rounded-md">
            Room Created By {roomInfo.name}
          </span>
        </h5>
        {/* Receiver Message */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
          <div className="max-w-[70%] bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <p className="text-gray-700">
              Hello, I'm looking for help with my recent order.
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:42 AM</span>
          </div>
        </div>

        {/* Sender Message */}
        <div className="flex justify-end">
          <div className="max-w-[70%] bg-indigo-500 text-white rounded-xl p-3 shadow-sm">
            <p>Of course! Could you share your order ID?</p>
            <span className="text-xs text-indigo-100 mt-1 block">10:43 AM</span>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-xl transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleChatRoom;
