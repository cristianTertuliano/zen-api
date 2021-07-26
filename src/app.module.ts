import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@core/config/typeorm.config';

import { GeneralsModule } from '@general/generals.module';

import { AccountModule } from '@module/account/account.module';
import { UserModule } from '@module/user/user.module';
import { EmailModule } from '@module/email/email.module';


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

    // shared all
    GeneralsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
