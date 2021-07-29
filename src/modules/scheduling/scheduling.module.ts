import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchedulingController } from '@module/scheduling/scheduling.controller';
import { SchedulingService } from '@module/scheduling/scheduling.service';

import { Scheduling } from '@core/entity/schedule/scheduling.entity';
import { ScheduleModule } from '@module/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Scheduling,
    ]),
    ScheduleModule
  ],
  controllers: [
    SchedulingController,
  ],
  providers: [
    SchedulingService,
  ],
  exports: [
    SchedulingService,
  ]
})
export class SchedulingModule {}
