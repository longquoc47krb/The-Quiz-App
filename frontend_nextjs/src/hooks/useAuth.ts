import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { getMe } from '@/apis/userServices';
import type { User } from '@/interfaces';

const useAuth = () => {
  const accessToken = Cookies.get('accessToken');
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        // Handle error if necessary
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);
  return {
    accessToken,
    user,
    setUser,
  };
};
export default useAuth;
