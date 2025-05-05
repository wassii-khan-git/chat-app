import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomRoute from "./routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CustomRoute />
    </QueryClientProvider>
  );
}

export default App;
