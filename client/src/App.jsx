import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomRoute from "./routes";
import { useEffect } from "react";
import { apiClient } from "./config";
import { useAuth } from "./hooks/index";

// App
function App() {
  const queryClient = new QueryClient();
  const { auth } = useAuth();
  const token = auth?.user?.token;

  useEffect(() => {
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
  }, [auth, token]);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomRoute />
    </QueryClientProvider>
  );
}

export default App;
