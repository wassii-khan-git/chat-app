import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // Create a QueryClient instance
  const queryClient = new QueryClient();

  // Router setup
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  // RouterProvider setup with QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        {/* Your app components go here */}
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
