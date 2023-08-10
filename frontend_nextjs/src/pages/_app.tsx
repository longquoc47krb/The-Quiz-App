import '../styles/global.scss';
import '../styles/index.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/loading';
import store, { persistor } from '@/middlewares/store';

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
