import { apiClient } from "../../config";

// Create Room
export const CreateRoomApi = async (form) => {
  try {
    const response = await apiClient.post("/chat/create-room", form);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// Get Room By Id
export const GetRoomByIdApi = async (roomId) => {
  try {
    const response = await apiClient.get(`/chat/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const GetMessagesByIdApi = async (roomId) => {
  try {
    const response = await apiClient.get(`/chat/messages/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
