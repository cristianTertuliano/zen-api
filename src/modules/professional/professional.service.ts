import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { AccountService } from '@module/account/account.service';

import { SignupDtoProfessional } from 'src/shared/dto/account/signup.dto';

import { UserProfessional } from '@core/entity/user/user-professional.entity';
import { TypeUser, User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';

@Injectable()
export class UserProfessionalService extends BaseService {
  constructor(
    protected accountService: AccountService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param void
  * @returns list professionals
  *
*/
  public async findAll(): Promise<User[]> {
    return await getRepository(User).find({
      where: {
        type: TypeUser.Professional
      },
      relations: [
        'account',
      ],
    });
  }

/**
  * @remarks
  * This method is async.
  *
  * @param userId
  * @returns one professional especific
  *
*/
  public async findOne(userId: string): Promise<User> {
    return await getRepository(User).findOne({
      where: {
        id: userId,
        type: TypeUser.Professional
      },
      relations: [
        'account',
        'professional',
        'schedules'
      ],
    });
  }  

/**
  * @remarks
  * This method is async.
  *
  * @param signupDtoProfessional
  * @returns The account patient object
  *
*/
  public async create(
    signupDtoProfessional: SignupDtoProfessional

  ): Promise<Account> {
    signupDtoProfessional.type = TypeUser.Professional;

    const account = await this.accountService.signup(signupDtoProfessional);

    // data professional
    account.user.professional = await getRepository(UserProfessional).save({
      accountId: account.id,
      userId: account.user.id,
      type: signupDtoProfessional.professionalType,
      document: signupDtoProfessional.document,
    });

    await getRepository(User).save({
      id: account.user.id,
      professional: account.user.professional,
    });

    return account;
  }
}
