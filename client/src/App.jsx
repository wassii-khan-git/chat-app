import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomRoute from "./routes";
import { useEffect } from "react";
import { apiClient } from "./config";
import { useAuth } from "./hooks/index";
import { useNavigate } from "react-router-dom";

// App Component
function App() {
  const queryClient = new QueryClient();
  const { auth, logout } = useAuth();
  const token = auth?.user?.token;
  const navigate = useNavigate();

  useEffect(() => {
    // for requests
    apiClient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Beared ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // Handle unauthorized access
          console.error("Unauthorized access - redirecting to login");
          // You can redirect to login page or show a message
          logout();
          // Optionally, you can redirect to a login page
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
  }, [auth, token, logout, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomRoute />
    </QueryClientProvider>
  );
}

export default App;
