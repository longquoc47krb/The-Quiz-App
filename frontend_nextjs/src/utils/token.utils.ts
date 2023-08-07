import jwt from 'jsonwebtoken';

export const verifyAccessToken = (accessToken: string) => {
  const user = jwt.decode(accessToken);
  return user;
};
