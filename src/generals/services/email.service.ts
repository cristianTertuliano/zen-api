import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';

import { smtp } from '@core/config/smtp-config';
import { BaseService } from '@core/base/base-service';

interface EmailTransport {
  template: string;
  message: any;
  locals: any;
}

@Injectable()
export abstract class EmailService extends BaseService {
}
