/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { LoginUserDTO } from './dtos/loginUser.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Login account' })
    @Post('/login')
    async login(@Body() loginUserDTO: LoginUserDTO): Promise<{ token: string }> {
        const token = await this.userService.login(loginUserDTO);
        return { token };
    }
    @ApiOperation({ summary: 'Register a new user account' })
    @Post('register')
    async registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<void> {
        await this.userService.registerUser(registerUserDTO);
    }

}

