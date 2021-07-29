import { 
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { SchedulingPostDto } from 'src/shared/dto/scheduling/scheduling.dto';
import { SchedulingService } from '@module/scheduling/scheduling.service';
import { Scheduling } from '@core/entity/schedule/scheduling.entity';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/scheduling')
export class SchedulingController extends BaseController {

  constructor(
    protected schedulingService: SchedulingService,
  ) {
    super(schedulingService);
  }

  // @Get('/professional/:professionalId')
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // async findAll(
  //   @Param('professionalId') userId: string,
  //   @Query() query: ScheduleGetDto,
  // ): Promise<Schedule | any> {
  //   return await this.scheduleService.findAll(userId, query);
  // }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() schedulingPostDto: SchedulingPostDto,
  ): Promise<Scheduling | any> {
    return await this.schedulingService.create(schedulingPostDto);
  }
}