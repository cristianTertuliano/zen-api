import { Module } from '@nestjs/common';
import { EmailModule } from '@module/email/email.module';

@Module({
  imports:[
    EmailModule, 
  ],
  providers: []
})
export class GeneralsModule {}
