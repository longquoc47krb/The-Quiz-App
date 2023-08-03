import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { getMe } from '@/apis/userServices';

const useAuth = () => {
  const accessToken = Cookies.get('accessToken');
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (accessToken) {
      const fetchUser = async () => {
        const userResponse = await getMe();
        setUser(userResponse);
      };
      fetchUser();
    }
  }, []);
  return {
    accessToken,
    user,
    setUser,
  };
};
export default useAuth;
