import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { EXPIRATION_DATE } from '@/common/constants';
import { useAuth } from '@/hooks/useAuthContext';

function Auth() {
  const router = useRouter();
  const { query } = router;
  const { token } = query;
  const { setIsLogged } = useAuth();
  useEffect(() => {
    Cookies.set('accessToken', token, {
      expires: EXPIRATION_DATE,
    });
    if (token) {
      router.push('/');
      setIsLogged(true);
    }
  }, [token]);
  return <p />;
}

export default Auth;
