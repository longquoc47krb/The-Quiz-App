import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Get('daily-counts/:id')
  async getDailyCounts(@Param('id') id: string): Promise<{ date: string; count: number }[]> {
    return this.statsService.getDailyCountsByQuizId(+id)
  }
}
