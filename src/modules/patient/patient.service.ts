import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@core/entity/user/user.entity';

import { BaseService } from '@core/base/base-service';

@Injectable()
export class PatientService extends BaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: User,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns user
  *

  public async getOneUserById(
    userId: string

  ): Promise<User> {
    const currentAccount = ContextService.currentAccount();

    return await this.userRepository.findOne({
      where: {
        accountId: currentAccount.id,
        id: userId,
      },
      relations: [
        'account'
      ],
    });
  }*/
}
