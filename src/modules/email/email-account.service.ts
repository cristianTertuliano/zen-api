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

/**
  * @remarks
  * This method is async.
  *
  * @param object
  * @returns void
  *
*/
  async sendEmailWelcome(emailWelcome: {
    creatorId: string,
    accountId: string,
    fullName: string,
    email: string,
    
  }): Promise<void> {
    const template = 'account-welcome';

    const response = await this.sendTransportEmail({
      template: template,
      message: {
        to: emailWelcome.email
      },
      locals: {
        fullName: emailWelcome.fullName
      }
    });

    if (response) {
      this.emailRepository.save({
        accountId: emailWelcome.accountId,
        creatorId: emailWelcome.creatorId,
        type: TypeEmail.NewAccount,
        status: StatusEmail.Pending,
        fromEmail: response.envelope.from,
        toEmail: response.envelope.to,
        subject: response.originalMessage.subject,
        template: template
      });
    }
  }
}
