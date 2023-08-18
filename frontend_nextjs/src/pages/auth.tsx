import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { EXPIRATION_DATE } from '@/common/constants';

function Auth() {
  const router = useRouter();
  const { query } = router;
  const { token } = query;

  useEffect(() => {
    Cookies.set('accessToken', token, {
      expires: EXPIRATION_DATE,
    });
    if (token) {
      router.push('/');
    }
  }, [token]);
  return <div>Auth</div>;
}

export default Auth;
