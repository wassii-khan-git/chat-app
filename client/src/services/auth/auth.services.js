import { apiClient } from "../../config";

// create account
export const CreateAccountApi = async (form) => {
  try {
    const response = await apiClient.post("/auth/create-account", form);
    return response.data;
  } catch (error) {
    // You can throw the error to be handled by the caller
    throw error.response ? error.response.data : error;
  }
};

// create account
export const LoginApi = async (form) => {
  try {
    const response = await apiClient.post("/auth/login", form);
    return response.data;
  } catch (error) {
    // You can throw the error to be handled by the caller
    throw error.response ? error.response.data : error;
  }
};
