import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '@module/account/account.module';
import { UserController } from '@module/user/user.controller';

import { UserRepository } from '@module/user/resources/user.repository';

import { UserService } from '@module/user/user.service';
import { ContextService } from '@general/services/context.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    AccountModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ContextService,
  ]
})
export class UserModule {}
