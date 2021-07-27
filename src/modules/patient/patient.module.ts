import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '@module/account/account.module';
import { PatientController } from '@module/patient/patient.controller';

import { User } from '@core/entity/user/user.entity';

import { PatientService } from '@module/patient/patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  controllers: [PatientController],
  providers: [
    PatientService,
  ]
})
export class PatientModule {}
