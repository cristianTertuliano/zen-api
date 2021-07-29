import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleController } from '@module/schedule/schedule.controller';
import { ScheduleService } from '@module/schedule/schedule.service';

import { Schedule } from '@core/entity/schedule/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
    ]),
  ],
  controllers: [
    ScheduleController
  ],
  providers: [
    ScheduleService,
  ],
  exports: [
    ScheduleService,
  ]
})
export class ScheduleModule {}
