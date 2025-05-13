import React from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SingleChatRoom from "../single-chat-room";
import { ACCENT_COLOR } from "../styles/index";

const Sidebar = ({
  searchTerm,
  handleSearch,
  roomsDataLoadingState,
  usersData,
  isNewRoomCreated,
  handleUserClick,
  handleDeleteRoom,
  chatOpenInfo,
  LeaveRoom,
  messages,
  handleSendMessage,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <form action="">
          <div className="border border-gray-300 rounded-md flex justify-center items-center gap-2 w-full mb-4">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search users..."
              className=" mx-3 outline-none w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchOutlined
              className={`bg-${ACCENT_COLOR}-500 rounded-sm cursor-pointer text-white p-3`}
            />
          </div>
        </form>
        {/* rooms created */}
        {roomsDataLoadingState ? (
          <div className="text-center">Loading...</div>
        ) : (
          usersData.map((item, index = 1) => (
            <div
              className="flex justify-between items-center shadow-md rounded-lg mt-4"
              key={index}
            >
              <div
                className={`flex justify-center items-start gap-3 p-2 ${
                  !isNewRoomCreated && "cursor-pointer"
                }`}
                onClick={() => {
                  !isNewRoomCreated && handleUserClick(item);
                }}
              >
                {/* icon */}
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">JD</span>
                </div>
                {/* name */}
                <h2 className="mt-1">
                  {item?.username || item?.members?.[0]?.username}
                </h2>
              </div>
              <div className="mr-3 transition-all ease-in-out duration-300 hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer">
                <DeleteOutlined onClick={() => handleDeleteRoom(item?._id)} />
              </div>
            </div>
          ))
        )}
      </div>
      {isNewRoomCreated ? (
        <>
          {/* chat messages */}
          <SingleChatRoom
            roomInfo={chatOpenInfo}
            LeaveRoom={LeaveRoom}
            messages={messages}
            handleSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <div className="w-full md:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className={`px-6 py-3 bg-${ACCENT_COLOR}-500 flex items-center justify-between text-white`}
          >
            Please Create a room
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
