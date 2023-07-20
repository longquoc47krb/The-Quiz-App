import { createParamDecorator } from '@nestjs/common';

export const AuthUserFn = (_, req: any) => {
    const user = req && req.locals && req.locals.user;
    return user ? user : null;
};
export const AuthUser = createParamDecorator(AuthUserFn);