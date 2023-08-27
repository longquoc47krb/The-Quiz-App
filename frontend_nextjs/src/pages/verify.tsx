import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { verifyAccount } from '@/apis/authServices';

function VerifyPage() {
  const router = useRouter();
  const { query } = router;
  const { code } = query;
  const [message, setMessage] = useState('');
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyAccount(code);
        console.log({ response });
        setMessage(response.message);
        setTimeout(() => {
          router.push('/verification');
        }, 2000);
      } catch (error) {
        console.log({ error });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    };
    verify();
  }, [code]);
  return <div>{message}</div>;
}

export default VerifyPage;
