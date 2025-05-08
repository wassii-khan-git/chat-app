import React, { useEffect, useRef, useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SingleChatRoom from "./single-chat-room";
import io from "socket.io-client";
import { useAuth } from "../hooks/auth";
import {
  CreateRoomApi,
  GetRoomByIdApi,
} from "../services/socket/socket-service";
import { AllUsers } from "../services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/helper";

// Chat
const Chat = () => {
  // socket ref
  const socketRef = useRef(null);
  // auth
  const { auth } = useAuth();
  // search term
  const [searchTerm, setSearchTerm] = useState("");
  // users data
  const [usersData, setUsersData] = useState([]);
  // room id
  const [roomId, setRoomId] = useState("");
  // new room created
  const [isNewRoom, setIsNewRoom] = useState(false);
  // messages
  const [messages, setMessages] = useState([]);
  // chat
  const [chatOpenInfo, setChatOpenInfo] = useState([]);

  // rooms data
  const { data: roomsData } = useQuery({
    queryKey: ["rooms", auth?.user?._id],
    queryFn: async () => {
      const response = await GetRoomByIdApi(auth?.user?._id);
      if (response.data) {
        setUsersData(response.data);
      }
      return response;
    },
    enabled: !!auth?.user?._id,
  });

  console.log("roomsData", roomsData);

  // console.log("i am data: ", data);

  const createRoom = async (roomInfo, roomId, user) => {
    try {
      // create room api
      const response = await CreateRoomApi(roomInfo);

      console.log("room create response:", response);

      // join the room
      socketRef.current.emit("join_room", { roomId });

      setIsNewRoom(true);

      setRoomId(response?.data?._id);

      // handle room creation info
      setUsersData((prev) => [
        response?.data,
        ...prev.filter((item) => item.id !== response?.data?.ownerId),
      ]);

      setChatOpenInfo(response?.data);

      // setUsersData([]);
      setSearchTerm("");
      // set the search term to empty
    } catch (error) {
      console.log("Error ", error);
      if (!error.success) {
        notify(error.message, false);
      }
    }
  };

  // handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    //assign the vlaue
    setSearchTerm(value);
    return;
  };
  // handle user click
  const handleUserClick = async (user) => {
    const roomId = user.id;
    // roominfo
    const id = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
    const roomInfo = {
      name: auth?.user?.username + "_room" + id,
      members: [user._id, auth.user._id],
      ownerId: auth?.user?._id,
    };
    console.log("I am room info: ", roomInfo);

    if (!user.status) {
      createRoom(roomInfo, roomId, user);
    }
    // else open the chat
    // join the room
    socketRef.current.emit("join_room", { roomId });

    setIsNewRoom(true);

    setChatOpenInfo(user);

    setSearchTerm("");
  };

  // handle delete room
  const handleDeleteRoom = (id) => {
    // setCreatedRoomInfo((prev) => prev.filter((item) => item.id !== id));
    // setIsActiveRoom(false);
    // setUsersData([]);
    notify("Sorry! we are working on this feature", false);
  };

  // handle send message
  const handleSendMessage = (message) => {
    // console.log(message);

    // const obj = {
    //   roomId: currentRoomId,
    //   sender: auth.user._id,
    //   content: message,
    //   date: Date.now(),
    // };
    // console.log(obj);

    // send this message to that room
    socketRef.current.emit("private_message", {
      roomId: roomId || "",
      sender: auth.user._id,
      content: message,
      date: Date.now(),
    });
  };

  useEffect(() => {
    // point to the exact port your server is listening on
    socketRef.current = io("http://localhost:8080");

    // Fired when the socket is connected
    socketRef.current.on("connect", () => {
      console.log("✅ Connected! Socket id:", socketRef.current.id);
    });

    // Listen for our custom "msg" event
    socketRef.current.on("private_message", (msg) => {
      console.log("📥 msg from server:", msg);
      if (msg.sender !== auth.user._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // get all the users
  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    const getUsersData = setTimeout(async () => {
      try {
        const response = await AllUsers(searchTerm);
        console.log("response", response);
        const filteredUsers = response?.data?.filter(
          (item) => item._id !== auth?.user?._id
        );
        if (filteredUsers.length > 0) {
          setUsersData(filteredUsers);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }, 1000);
    return () => clearTimeout(getUsersData);
  }, [searchTerm]);

  // console.log("messages with mine, ", messages);
  // console.log("search term", searchTerm);
  console.log("user data", usersData);
  // console.log("auth", auth);

  return (
    <div className="p-4 rounded-lg">
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
          {/* rooms created */}
          {usersData.map((item, index = 1) => (
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
                  <span className="text-sm font-medium text-gray-600">JD</span>
                </div>
                {/* name */}
                <h2 className="mt-1">
                  {item.username || item.members?.[0]?.username}
                </h2>
              </div>
              <div className="mr-3 transition-all ease-in-out duration-300 hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer">
                <DeleteOutlined onClick={() => handleDeleteRoom(item?._id)} />
              </div>
            </div>
          ))}
        </div>
        {isNewRoom ? (
          <>
            {/* chat messages */}
            <SingleChatRoom
              roomInfo={chatOpenInfo}
              messages={messages}
              handleSendMessage={handleSendMessage}
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
      {/* Toast Container */}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;
