import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTokenDTO } from './dto/create-token.dto';
@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) { }

  @Post()
  create(@Body() createTokenDto: CreateTokenDTO) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(+id);
  }
  @Get()
  findByUserId(@Query('userId') userId: string) {
    return this.tokenService.findByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(+id, updateTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(+id);
  }
}
