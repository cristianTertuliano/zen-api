import { Injectable } from '@nestjs/common';

import { smtp } from '@core/config/smtp-config';
import { BaseService } from '@core/base/base-service';

import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';

interface EmailTransport {
  template: string;
  message: any;
  locals: any;
}

@Injectable()
export abstract class EmailService extends BaseService {

/**
  * @remarks
  * This method is async.
  *
  * @param EmailOptions
  * @returns void
  *
*/
  protected async sendTransportEmail(
    emailOptions: EmailTransport,
  
  ): Promise<any> {
    // prepare transport (nodemailer)
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.password,
      },
      tls: { rejectUnauthorized: false },
    });

    // prepare template
    const template = new EmailTemplate({
      message: {
        from: smtp.from,
      },
      send: true,
      preview: false,
      transport,
    });
 
    return await template.send(emailOptions);
  }
}
