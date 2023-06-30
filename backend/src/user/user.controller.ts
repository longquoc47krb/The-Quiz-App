/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dtos/loginUser.dto';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }



}

