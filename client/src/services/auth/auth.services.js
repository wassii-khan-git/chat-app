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

// all users
export const AllUsers = async (value) => {
  try {
    let endpoint = value
      ? `/auth/all-users?searchTerm=${value}`
      : "/auth/all-users";
    console.log("endpoint", endpoint);

    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    // You can throw the error to be handled by the caller
    throw error.response ? error.response.data : error;
  }
};
