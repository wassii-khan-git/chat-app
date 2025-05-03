import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";

function App() {
  // Router setup
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  // RouterProvider setup
  return <RouterProvider router={router} />;
}

export default App;
