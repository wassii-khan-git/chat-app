import { toast } from "react-toastify";

// notification alert
export const notify = (message, flag) => {
  return flag ? toast.success(message) : toast.error(message);
};
