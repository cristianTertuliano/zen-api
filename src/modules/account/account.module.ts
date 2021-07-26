import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtSecret } from '@core/config/jwt-secret.config';
import { JwtStrategy } from '@module/account/resources/jwt-strategy';

import { UserRepository } from '@module/user/resources/user.repository';
 
import { Account } from '@core/entity/account/account.entity';
import { Email } from '@core/entity/email/email.entity';

import { AccountController } from '@module/account/account.controller';

import { AccountService } from '@module/account/account.service';
import { EmailAccountService } from '@module/email/email-account.service';


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: 99999,
      }
    }),
    TypeOrmModule.forFeature([
      Account,
      UserRepository,
      Email
    ]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    JwtStrategy,
    EmailAccountService,
  ],
  exports: [
    AccountService,
    JwtStrategy,
    PassportModule
  ]
})
export class AccountModule {}
