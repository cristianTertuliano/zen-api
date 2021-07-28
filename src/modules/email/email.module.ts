import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Email } from '@core/entity/email/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Email,
    ]),
  ],  
  controllers: [],
  providers: []
})
export class EmailModule {}