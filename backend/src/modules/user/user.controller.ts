
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @Get()
  @ApiOperation({ summary: 'Find user by email or username' })
  @ApiQuery({ name: 'username', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'identifier', required: false })
  findByField(@Query('username') username?: string, @Query('email') email?: string, @Query('identifier') identifier?: string) {
    if (username) {
      return this.userService.findByUsername(username)
    }
    if (identifier) {
      return this.userService.findByEmailOrUsername(identifier);
    }
    return this.userService.findByEmail(email);
  }
}
