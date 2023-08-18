import '../styles/global.scss';
import '../styles/index.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/loading';
import { AuthProvider } from '@/hooks/useAuthContext';
import store, { persistor } from '@/middlewares/store';

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </AuthProvider>
    </Provider>
  );
};

export default MyApp;
