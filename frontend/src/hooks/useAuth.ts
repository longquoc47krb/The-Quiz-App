/* eslint-disable no-inner-declarations */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getMe } from '../apis/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { login, userSelector } from '../store/slices/authSlice';
const useAuth = () => {
    // State to keep track of the authenticated user
    const user = useSelector(userSelector);
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

    return { user, cookies, setCookie, removeCookie, dispatch };
};

export default useAuth;
