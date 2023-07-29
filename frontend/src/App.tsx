import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { CookiesProvider } from "react-cookie";
import AppRouter from "./configs/AppRouter";

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
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </CookiesProvider>
    </Provider>
  );
};

export default App;
