import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPatientController } from '@module/patient/patient.controller';

import { UserPatientService } from '@module/patient/patient.service';

import { User } from '@core/entity/user/user.entity';
import { AccountModule } from '@module/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
    AccountModule,
  ],
  controllers: [UserPatientController],
  providers: [
    UserPatientService,
  ]
})
export class UserPatientModule {}
