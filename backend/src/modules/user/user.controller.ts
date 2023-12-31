
import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginType, Role } from 'src/configs/enum';
import { Roles, RolesGuard } from 'src/utils';
import { User } from 'src/utils/decorator/user.decorator';
import { LoginUserDTO } from '../auth/dto/login-credential.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ResponseDto } from 'src/utils/interface/response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get('/users')
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.userService.update(+id, updateUserDto);
  }
  @Patch('new-password/:id')
  async newPassword(@Param('id') id: string, @Body() loginUserDto: LoginUserDTO) {
    try {
      const user = await this.userService.findByEmailOrUsername(loginUserDto.identifier)
      if (user.password === "" && user.loginType === LoginType.EmailPassword) {
        const password = await this.userService.hashPassword(loginUserDto.password);
        const updateUserDto: UpdateUserDTO = {
          password
        }
        return await this.userService.update(+id, updateUserDto);
      }
      throw new NotFoundException('User cannot be update new password')
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }



  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Get('/me')
  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  async getMe(
    @User() user: UserEntity,
  ) {
    try {
      console.log({ user });

      const userEntity = await this.userService.getOne(user?.id)
      return new ResponseDto(200, 'Fetched user successfully', userEntity)
    } catch (error) {

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get(":id")
  findById(@Param('id') id: string) {
    const userEntity = this.userService.getOne(+id)
    return new ResponseDto(200, 'Fetched user successfully', userEntity)
  }
  @Get()
  @ApiOperation({ summary: 'Find user by email or username' })
  @ApiQuery({ name: 'username', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'identifier', required: false })
  findByField(@Query('username') username?: string, @Query('email') email?: string, @Query('identifier') identifier?: string) {
    if (username) {
      const userEntity = this.userService.findByUsername(username)
      return new ResponseDto(200, 'Fetched user successfully', userEntity)
    }
    if (identifier) {
      const userEntity = this.userService.findByEmailOrUsername(identifier);
      return new ResponseDto(200, 'Fetched user successfully', userEntity)
    }
    const userEntity = this.userService.findByEmail(email);
    return new ResponseDto(200, 'Fetched user successfully', userEntity)
  }
}
