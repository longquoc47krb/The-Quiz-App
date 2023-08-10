/* eslint-disable react-hooks/rules-of-hooks */
import type { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import type { ComponentType } from 'react';
import { useEffect } from 'react';

import type { DecodedUser } from '@/interfaces';
import { authenticateUser } from '@/lib/authenticate';

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
    useEffect(() => {
      if (!props.isAuthenticated) {
        router.replace('/login'); // Redirect to login page if not authenticated
      } else if (
        (currentRoute === '/login' && props.isAuthenticated) ||
        (currentRoute === '/register' && props.isAuthenticated)
      ) {
        router.replace('/');
      }
    }, [props.isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const { req, res } = ctx;
    // Implement this function to check user authentication
    const { isAuthenticated, user } = await authenticateUser(req, res);
    const serverSideProps: ServerSideProps = {
      isAuthenticated,
    };

    const wrappedComponentProps: WrappedComponentProps = {
      user, // Change this according to the actual user data you expect
    };

    return { ...serverSideProps, ...wrappedComponentProps };
  };

  return Wrapper;
}

export default withAuth;
