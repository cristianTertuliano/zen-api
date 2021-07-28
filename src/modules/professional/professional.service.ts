import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { AccountService } from '@module/account/account.service';

import { SignupDtoProfessional } from 'src/shared/dto/account/signup.dto';

import { UserProfessional } from '@core/entity/user/user-professional.entity';
import { TypeUser, User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';
import { Schedule } from '@core/entity/schedule/schedule.entity';
import { scheduled } from 'rxjs';

@Injectable()
export class UserProfessionalService extends BaseService {
  constructor(
    @InjectRepository(UserProfessional)
    private professionalRepository: UserProfessional,
    protected accountService: AccountService,
  ) {
    super();
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

    const account = await this.accountService.create(signupDtoProfessional);

    // data professional
    account.user.professional = await getRepository(UserProfessional).save({
      accountId: account.id,
      userId: account.user.id,
      type: signupDtoProfessional.professionalType,
      document: signupDtoProfessional.document,
    });

    // data schedule professional
    account.user.schedule = await getRepository(Schedule).save({
      accountId: account.id,
      userId: account.user.id,
    });

    await getRepository(User).save({
      id: account.user.id,
      professional: account.user.professional,
      schedule: account.user.schedule,
    });

    return account;
  }
}
