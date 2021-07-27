import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '@module/account/account.module';
import { UserController } from '@module/user/user.controller';

import { User } from '@core/entity/user/user.entity';

import { UserService } from '@module/user/user.service';
import { ContextService } from '@general/services/context.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ContextService,
  ]
})
export class UserModule {}
