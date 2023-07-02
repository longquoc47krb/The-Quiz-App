import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "./configs/routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

// Create a client
const queryClient = new QueryClient();
const App: React.FC = () => {
  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{routes()}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
