import React, { useState, useEffect, useRef } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks";

const SingleChatRoom = ({
  roomInfo,
  LeaveRoom,
  handleSendMessage,
  messages,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  // const [localMessages, setLocalMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const { auth } = useAuth();

  const allMessages = [
    // Map over API messages and add 'isMine' property
    ...messages.map((msg) => ({
      ...msg,
      isMine: msg.sender === auth?.user?._id,
    })),
  ].sort(
    (a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
  );

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // max height in px
      )}px`;
    }
  };

  useEffect(() => {
    scrollToBottom();
    adjustTextareaHeight();
  }, [allMessages, inputMessage]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Create new message
    // const newMessage = {
    //   text: inputMessage,
    //   date: new Date().toISOString(),
    //   isMine: true,
    // };

    // Update state
    // setLocalMessages((prev) => [...prev, newMessage]);
    handleSendMessage(inputMessage, roomInfo._id, roomInfo?.members?.[0]?._id);
    setInputMessage("");
  };

  console.log("messages", messages);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-indigo-600 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => LeaveRoom(roomInfo._id)}
            className="text-white hover:text-indigo-200 mr-4"
          >
            <LeftOutlined className="text-lg" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {roomInfo?.members?.[0].username || roomInfo.name}
            </h2>
            <p className="text-indigo-100 text-sm">
              {roomInfo.members?.[0].online ? "online" : "offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-200 hover:text-white cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {allMessages.map((message, index) => (
            <div
              key={`msg-${index}`}
              className={`flex ${
                message.isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[70%]">
                <div
                  className={`rounded-lg p-3 shadow-sm ${
                    message.isMine
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {message.text || message.message}
                  </p>
                  <span
                    className={`text-xs mt-1 block ${
                      message.isMine ? "text-indigo-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(
                      message.date || message.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="text-sm mt-12 ml-2">
                {message.isMine ? (message.seen ? "seen" : "sent") : ""}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 resize-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent scrollbar-hide overflow-y-auto"
            style={{
              minHeight: "40px",
              maxHeight: "200px",
            }}
            onChange={(e) => {
              setInputMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center h-[40px]"
          >
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
