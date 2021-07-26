import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailController } from '@module/email/email.controller';
import { Email } from '@core/entity/email/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Email,
    ]),
  ],  
  controllers: [EmailController],
  providers: []
})
export class EmailModule {}