import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { UserService } from '@module/user/user.service';
import { EmailAccountService } from '@module/email/email-account.service';
// import { JwtPayload } from '@module/account/resources/jwt-payload.interface';

import { User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';

@Injectable()
export class AccountService extends BaseService{
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    private emailAccountService: EmailAccountService,
    // private jwtService: JwtService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param signup
  * @returns The account
  *
*/  
  public async create(signup: any): Promise<Account> {

    if (await getRepository(User).findOne({
      email: signup.email
    })) {
      throw new ConflictException(
        'Email '+ signup.email +' já esta cadastrado'
      );
    }

    // create account
    const account = await this.accountRepository.save({
      isConfirmConfigured: true
    });

    // create user
    signup.accountId = account.id;
    account.user = await this.userService.create(signup);

    // send email
    this.emailAccountService.sendEmailWelcome({
      creatorId: account.user.id,
      accountId: account.user.accountId,
      fullName: account.user.fullName,
      email: account.user.email,
    });

    return account;
  }
}