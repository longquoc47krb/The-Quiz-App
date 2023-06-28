import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "./configs/routes";

// Create a client
const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{routes()}</BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
