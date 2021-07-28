import { Injectable } from '@nestjs/common';

import { SignupDtoPatient } from 'src/shared/dto/account/signup.dto';

import { BaseService } from '@core/base/base-service';
import { AccountService } from '@module/account/account.service';

import { TypeUser } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';


@Injectable()
export class UserPatientService extends BaseService {
  constructor(
    protected accountService: AccountService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param signupDtoPatient
  * @returns The account patient object
  *
*/
  public async create(
    signupDtoPatient: SignupDtoPatient

  ): Promise<Account> {
    signupDtoPatient.type = TypeUser.Patient;

    return await this.accountService.signup(signupDtoPatient);
  }
}
