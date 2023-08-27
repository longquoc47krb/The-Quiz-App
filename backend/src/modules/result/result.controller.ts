import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Roles, RolesGuard } from 'src/utils';
import { Role } from 'src/configs/enum';

@ApiTags('Result')
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Post()
  @ApiOperation({ summary: 'Handle result of quiz' })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }
  @Get('/player/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  findAllByPlayerId(@Param('id') id: string) {
    return this.resultService.findAllByPlayerId(+id);
  }
  @Get('/quiz/:id')
  // @ApiBearerAuth()
  // @UseGuards(RolesGuard)
  // @Roles(Role.User)
  findAllByQuizId(@Param('id') id: string) {
    return this.resultService.findAllByQuizId(+id);
  }
  @Get('/quiz/user/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  findAllByPlayerIdAndQuizId(@Param('id') id: string, @Query('quizId') quizId: string) {
    return this.resultService.findAllByPlayerIdAndQuizId(+id, +quizId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
