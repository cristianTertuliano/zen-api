import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtSecret } from '@core/config/jwt-secret.config';
import { JwtStrategy } from '@module/account/resources/jwt-strategy';

import { Account } from '@core/entity/account/account.entity';

import { AccountController } from '@module/account/account.controller';

import { AccountService } from '@module/account/account.service';
import { EmailAccountService } from '@module/email/email-account.service';
import { UserService } from '@module/user/user.service';
import { Email } from '@core/entity/email/email.entity';
import { User } from '@core/entity/user/user.entity';

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
      User,
      Email,
    ]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    EmailAccountService,
    UserService,
    JwtStrategy,    
  ],
  exports: [
    AccountService,
    PassportModule,
    JwtStrategy,
  ]
})
export class AccountModule {}
