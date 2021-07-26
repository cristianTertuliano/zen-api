import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Email,
  StatusEmail,
  TypeEmail
} from '@core/entity/email/email.entity';

import { EmailService } from '@general/services/email.service';

@Injectable()
export class EmailAccountService extends EmailService {
 
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {
    super();
  }
}
