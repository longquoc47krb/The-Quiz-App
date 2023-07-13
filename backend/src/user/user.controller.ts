/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Get(":id")
  findById(@Param('id') id: string) {
    return this.userService.getOne(+id)
  }
  @Get(":email")
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }
  @Get(":username")
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username)
  }
  @Get(":identifier")
  findByIdentifier(@Param('identifier') identifier: string) {
    return this.userService.findByEmailOrUsername(identifier);
  }
}
