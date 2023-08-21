import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', ''); // Assuming the token is sent in the 'Authorization' header as 'Bearer <token>'

    if (!token) {
        return null;
    }

    try {
        const jwtService = new JwtService({});
        console.log({ jwtService }) // You can inject JwtService if it's already provided in your AppModule
        const decodedToken = jwtService.decode(token);
        return decodedToken;
    } catch (e) {
        console.log({ e })
        return null;
    }
});