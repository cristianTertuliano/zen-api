import { 
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { ScheduleService } from '@module/schedule/schedule.service';
import { Schedule } from '@core/entity/schedule/schedule.entity';
import { ScheduleUpdateDto } from 'src/shared/dto/schedule/update.dto';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/schedule')
export class ScheduleController extends BaseController {

  constructor(
    protected scheduleService: ScheduleService,
  ) {
    super(scheduleService);
  }

  @Post('/professional/:professionalId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() scheduleBody: Schedule,
    @Param('professionalId') userId: string,
  ): Promise<Schedule> {
    return await this.scheduleService.create(userId, scheduleBody);
  }

  @Put('/:scheduleId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Body() scheduleBody: ScheduleUpdateDto,
    @Param('scheduleId') scheduleId: string,
  ): Promise<Schedule> {
    return await this.scheduleService.update(scheduleId, scheduleBody);
  }

  @Delete('/:scheduleId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async delete(
    @Param('scheduleId') scheduleId: string,
  ): Promise<void> {
    await this.scheduleService.delete(scheduleId);
  }  
}