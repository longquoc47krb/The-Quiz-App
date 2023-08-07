/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */

import { NextApiRequest, NextApiResponse } from "next";
import * as jose from 'jose';
import { DecodedUser } from "@/interfaces";
import { JWT_SECRET } from "@/common/constants";


// Function to authenticate the user based on the request's cookies
interface AuthenticateUser {
  isAuthenticated: boolean;
  user: DecodedUser | undefined;
}
export const authenticateUser = (
  req: NextApiRequest,   
  res: NextApiResponse
): Promise<AuthenticateUser> => {
  try {
    const tokenInCookie = req.headers.cookie;
    const accessToken = tokenInCookie?.replace('accessToken=','');
    if (!accessToken) {
      return Promise.resolve({
        isAuthenticated: false,
        user: undefined
      })
    }
    // Verify the accessToken and extract user data
    const decoded = jose.decodeJwt(accessToken);
    if (!decoded) {
      return Promise.resolve({
        isAuthenticated: false,
        user: undefined,
      })
    }

    return Promise.resolve({
      isAuthenticated: true,
      user: {
        userId: decoded.id,
        name: decoded.name,
        roles: decoded.roles
      },
    })
  } catch (error) {
    return Promise.resolve({
      isAuthenticated: false,
      user: undefined,
    })
  }
};
