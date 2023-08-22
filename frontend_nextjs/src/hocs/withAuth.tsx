/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
import type { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import type { ComponentType } from 'react';
import { useEffect } from 'react';

import { getMe } from '@/apis/userServices';
import type { DecodedUser } from '@/interfaces';

type ServerSideProps = {
  isAuthenticated: boolean;
};
type WrappedComponentProps = {
  user: DecodedUser | undefined; // Change this according to the actual user data you expect
};
type Props = WrappedComponentProps & ServerSideProps;
function withAuth<T extends Props>(
  WrappedComponent: NextComponentType<NextPageContext, ServerSideProps, T>,
): ComponentType<T> {
  const Wrapper = (props: T) => {
    const router = useRouter();
    const currentRoute = router.pathname;
    console.log({ props });
    useEffect(() => {
      if (!props.isAuthenticated) {
        // Show a push notification for unauthenticated users
        if (Notification.permission === 'granted') {
          new Notification('Authentication Required', {
            body: 'You are not authenticated. Please log in.',
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('Authentication Required', {
                body: 'You are not authenticated. Please log in.',
              });
            }
          });
        }

        if (currentRoute !== '/login' && currentRoute !== '/register') {
          router.replace('/login'); // Redirect to login page if not authenticated
        }
      } else if (currentRoute === '/login' || currentRoute === '/register') {
        router.replace('/');
      }
    }, [props.isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    // Implement this function to check user authentication
    try {
      const response = await getMe();
      const serverSideProps: ServerSideProps = {
        isAuthenticated: !!response.data,
      };

      const wrappedComponentProps: WrappedComponentProps = {
        user: response.data, // Change this according to the actual user data you expect
      };

      return { ...serverSideProps, ...wrappedComponentProps };
    } catch (err) {
      const serverSideProps: ServerSideProps = {
        isAuthenticated: false,
      };

      const wrappedComponentProps: WrappedComponentProps = {
        user: null, // Change this according to the actual user data you expect
      };

      return { ...serverSideProps, ...wrappedComponentProps };
    }
  };

  return Wrapper;
}

export default withAuth;
