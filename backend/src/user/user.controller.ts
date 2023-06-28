/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    async registerAccount(
        @Body('name') name: string,
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.userService.registerAccount(name, username, email, password);
    }

}

