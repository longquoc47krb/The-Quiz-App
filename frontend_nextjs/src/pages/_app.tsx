import '../styles/global.scss';
import '../styles/index.css';
import '@splidejs/react-splide/css/core';
// Default theme
import '@splidejs/react-splide/css';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/loading';
import { AuthProvider } from '@/hooks/useAuthContext';
import store, { persistor } from '@/middlewares/store';

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <AuthProvider>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </AuthProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
