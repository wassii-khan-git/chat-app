import { toast } from "react-toastify";

// notification alert
export const notify = (message, flag) => {
  return flag ? toast.success(message) : toast.error(message);
};

// src/utils/chatHelpers.js
export const getInitials = (name) => {
  if (!name) return "??";
  const words = name.split(" ");
  if (words.length > 1) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const formatTimestamp = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateOrTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return formatTimestamp(dateString); // "10:30 AM"
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }); // "MM/DD/YY"
};
