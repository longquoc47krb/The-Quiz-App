// pages/_middleware/checkAuth.ts
import axios from 'axios';
import * as jose from 'jose';
import Cookies from 'js-cookie';

import { refreshAuthToken } from '@/apis/authServices';
import { fetchUserById } from '@/apis/userServices';
import { EXPIRATION_DATE } from '@/common/constants';
import { setUser } from '@/middlewares/slices/quizSessionSlice';
import store from '@/middlewares/store';

export async function authMiddleware() {
  // Check if there's an auth token in cookies or local storage
  const refreshTokenLocalStorage: string =
    localStorage.getItem('refreshToken') || '';
  const refreshedToken = await refreshAuthToken({
    refreshToken: refreshTokenLocalStorage,
  });

  if (refreshedToken) {
    const { accessToken, refreshToken } = refreshedToken;
    // Attach the refreshed token's payload to the request object
    Cookies.set('accessToken', accessToken, {
      expires: EXPIRATION_DATE,
    });
    const decoded = jose.decodeJwt(accessToken);
    const payload = await fetchUserById(decoded?.id);
    store.dispatch(setUser(payload));

    // Update the authToken in cookies or local storage
    localStorage.setItem('refreshToken', refreshToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
