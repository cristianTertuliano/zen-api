import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfessionalController } from '@module/professional/professional.controller';

import { UserProfessionalService } from '@module/professional/professional.service';

import { UserProfessional } from '@core/entity/user/user-professional.entity';
import { AccountModule } from '@module/account/account.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProfessional,
    ]),
    AccountModule,
  ],
  controllers: [UserProfessionalController],
  providers: [
    UserProfessionalService,
  ]
})
export class UserProfessionalModule {}
