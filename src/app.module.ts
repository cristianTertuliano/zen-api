import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@core/config/typeorm.config';

import { GeneralsModule } from '@general/generals.module';

import { AccountModule } from '@module/account/account.module';
import { UserModule } from '@module/user/user.module';
import { UserProfessionalModule } from '@module/professional/professional.module';
import { UserPatientModule } from '@module/patient/patient.module';
import { EmailModule } from '@module/email/email.module';
import { ScheduleModule } from '@module/schedule/schedule.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      typeOrmConfig
    ),
    AccountModule,
    UserModule,
    EmailModule,
    UserProfessionalModule,
    UserPatientModule,
    ScheduleModule,

    // shared all
    GeneralsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
