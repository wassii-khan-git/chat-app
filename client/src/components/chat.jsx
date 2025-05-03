import React, { useState } from "react";
import CreateAccount from "./create-account";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Users } from "../assets/data";
import { isAccountCreated } from "../chat.config";
import SingleChatRoom from "./single-chat-room";

const Chat = () => {
  // search term state
  const [searchTerm, setSearchTerm] = React.useState("");
  // eslint-disable-next-line
  const [usersData, setUsersData] = useState(Users); // Replace with actual user data
  // filtered user data state
  const [filteredUsersData, setFilteredUsersData] = useState([]); // Replace with actual user data
  // filtered user info
  const [filteredUserInfo, setFilteredUserInfo] = useState({});
  // room created state
  const [isRoomCreated, setIsRoomCreated] = useState(null);
  // joined room array
  const [createdRoomInfo, setCreatedRoomInfo] = useState([]);
  // handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSearchTerm(value);
      const filteredUsersData = usersData.filter((item) =>
        item.email.toLowerCase().includes(value)
      );
      console.log("filteredUSers", filteredUsersData);
      if (filteredUsersData.length > 0) {
        setFilteredUsersData(filteredUsersData);
      }
      return;
    }
    setSearchTerm("");
    setFilteredUserInfo([]);
    return;
  };
  // handle user click
  const handleUserClick = (user) => {
    setFilteredUserInfo(user);
    setIsRoomCreated(true);
    // handle room creation info
    setCreatedRoomInfo((prev) => [
      user,
      ...prev.filter((item) => item.id !== user.id),
    ]);
    // set the search term to empty
    setSearchTerm("");
    // empty the filteredUsersData
    setFilteredUsersData([]);
    // set the search term to empty
  };
  // handle room creation
  const handleRoomCreation = () => {
    setIsRoomCreated(false);
  };
  // handle delete room
  const handleDeleteRoom = (id) => {
    setCreatedRoomInfo((prev) => prev.filter((item) => item.id !== id));
    setIsRoomCreated(false);
    setFilteredUserInfo({});
    setFilteredUsersData([]);
  };

  return (
    <div className="p-4 rounded-lg">
      {/* Create an account */}
      {!isAccountCreated ? (
        <CreateAccount />
      ) : (
        <>
          {/* sidebar */}
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
                  <SearchOutlined className="bg-indigo-500 rounded-sm cursor-pointer text-white p-3" />
                </div>
              </form>
              <ul className="mt-2">
                {/* List of users */}
                {filteredUsersData.map((item, index = 1) => (
                  <li
                    key={index}
                    className="py-2 border-b cursor-pointer"
                    onClick={() => handleUserClick(item)}
                  >
                    {item.email}
                  </li>
                ))}
              </ul>
              {/* rooms created */}
              {createdRoomInfo.map((item, index = 1) => (
                <div
                  className="flex justify-between items-center shadow-md rounded-lg mt-4"
                  key={index}
                >
                  <div
                    className="flex justify-center items-start gap-3 p-2 cursor-pointer"
                    onClick={() => handleUserClick(item)}
                  >
                    {/* icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        JD
                      </span>
                    </div>
                    {/* name */}
                    <h2 className="mt-1">{item.name}</h2>
                  </div>
                  <div className="mr-3 transition-all ease-in-out duration-300 hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer">
                    <DeleteOutlined
                      onClick={() => handleDeleteRoom(item?.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {isRoomCreated ? (
              <>
                {/* chat messages */}
                <SingleChatRoom
                  roomInfo={filteredUserInfo}
                  handleRoomCreation={handleRoomCreation}
                />
              </>
            ) : (
              <div className="w-full md:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-3 bg-indigo-500 flex items-center justify-between text-white">
                  Please Create a room
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
