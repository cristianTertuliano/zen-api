import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleController } from '@module/schedule/schedule.controller';
import { ScheduleService } from '@module/schedule/schedule.service';
import { SchedulingService } from '@module/scheduling/scheduling.service';

import { ScheduleUtil } from 'src/shared/util/schedule/schedule.util';
import { UserProfessionalUtil } from 'src/shared/util/user/professional.util';

import { Schedule } from '@core/entity/schedule/schedule.entity';
import { Scheduling } from '@core/entity/schedule/scheduling.entity';
import { SchedulingUtil } from 'src/shared/util/scheduling/scheduling.util';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Scheduling,
    ]),
  ],
  controllers: [
    ScheduleController
  ],
  providers: [
    ScheduleService,
    SchedulingService,
    ScheduleUtil,
    SchedulingUtil,
    UserProfessionalUtil,
  ]
})
export class ScheduleModule {}
