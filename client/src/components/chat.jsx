import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../hooks";
import {
  CreateRoomApi,
  GetRoomByIdApi,
} from "../services/socket/socket-service";
import { AllUsers } from "../services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils/helper";
import Sidebar from "./common/sidebar";

// Chat
const Chat = () => {
  // socket
  const socketRef = useRef(null);
  // auth
  const { auth } = useAuth();
  // new room
  const [isNewRoomCreated, setIsNewRoomCreated] = useState(false);
  // search term
  const [searchTerm, setSearchTerm] = useState("");
  // users data
  const [usersData, setUsersData] = useState([]);
  // messages
  const [messages, setMessages] = useState([]);
  // chat
  const [chatOpenInfo, setChatOpenInfo] = useState([]);

  // rooms data
  const { isLoading: roomsDataLoadingState } = useQuery({
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

  const createRoom = async (roomInfo, roomId) => {
    try {
      // create room api
      const response = await CreateRoomApi(roomInfo);

      // join the room
      socketRef.current.emit("join_room", { roomId });

      // update the state
      setIsNewRoomCreated(true);

      // handle room creation info
      setUsersData((prev) => [
        response?.data?.[0],
        ...prev.filter((item) => item.id !== response?.data?.ownerId),
      ]);
      // update the chat info
      setChatOpenInfo(response?.data?.[0]);
      // empty the search term
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
    const roomId = user._id;
    // roominfo
    const id = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
    // create roominfo obj
    const roomInfo = {
      name: auth?.user?.username + "_room" + id,
      members: [user._id],
      ownerId: auth?.user?._id,
    };
    // if there room is not created
    if (!user.status) {
      createRoom(roomInfo, roomId, user);
    }
    // join the room
    socketRef.current.emit("join_room", { roomId });
    // update the state
    setIsNewRoomCreated(true);
    // update the chat open user
    setChatOpenInfo(user);
    // empty the search term
    setSearchTerm("");
  };

  // handle delete room
  const handleDeleteRoom = () => {
    notify("Sorry! we are working on this feature", false);
  };

  // handle send message
  const handleSendMessage = (message, roomID, receiver) => {
    console.log(message);
    // send this message to that room
    socketRef.current.emit("chat", {
      roomId: roomID,
      message,
      sender: auth.user._id,
      receiver,
      date: Date.now(),
    });
  };

  const LeaveRoom = (roomId) => {
    // leave the room
    socketRef.current.emit("leave_room", { roomId });
    // close the chat
    setIsNewRoomCreated(false);
  };

  useEffect(() => {
    // if auth has token
    if (auth?.token) {
      // socket
      const socket = io("http://localhost:8080", {
        auth: {
          token: auth?.token,
        },
      });
      // assign it to the socket ref
      socketRef.current = socket;

      // chat event
      socket.on("chat", (messages) => {
        console.log("messages from server", messages);
        setMessages((prev) => [...prev, messages]);
      });

      // chat event
      socket.on("join_room", (messages) => {
        console.log("messages from server", messages);
        // assign to the filter messsages
        setMessages(messages.length > 0 ? messages : []);
      });
      // clean the effect
      return () => {
        socket.off("join_room");
        socket.off("chat");
        socket.disconnect();
      };
    }
  }, [auth?.token]);

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

  return (
    <div className="p-4 rounded-lg">
      {/* sidebar */}
      <Sidebar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        roomsDataLoadingState={roomsDataLoadingState}
        usersData={usersData}
        isNewRoomCreated={isNewRoomCreated}
        handleUserClick={handleUserClick}
        handleDeleteRoom={handleDeleteRoom}
        chatOpenInfo={chatOpenInfo}
        LeaveRoom={LeaveRoom}
        messages={messages}
        handleSendMessage={handleSendMessage}
      />
      {/* Toast Container */}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;
