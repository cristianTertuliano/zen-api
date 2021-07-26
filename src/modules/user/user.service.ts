import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '@module/user/resources/user.repository';

import { User } from '@core/entity/user/user.entity';

import { BaseService } from '@core/base/base-service';
import { ContextService } from '@general/services/context.service';
import { AccountService } from '@module/account/account.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private accountService: AccountService,
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
  }
*/
/**
* @remarks
* This method is async.
*
* @param string
* @returns user
*

  public async updateOneUserById(
    user: User,

  ): Promise<User> {
    const currentAccount = ContextService.currentAccount();

    user.accountId = currentAccount.id;
    return await this.userRepository.save(user);
  }*/

/**
  * @remarks
  * This method is async.
  *
  * @param UpdateUserPasswordDto
  * @returns The account object
  *

  public async updateOneUserPassword (
    updateUserPasswordDto: UpdateUserPasswordDto

  ): Promise<User> {
    const hashCode = await this.accountService.getOneAccountCodByHash(
      updateUserPasswordDto.code
    );
    
    if (hashCode) {
      if (updateUserPasswordDto.password !== 
          updateUserPasswordDto.confirmPassword)  {
        throw new InternalServerErrorException('unmatched password');
      }
      updateUserPasswordDto.userId = hashCode.creatorId;
    }

    // invalid hashcode
    await this.accountService.updateOneAccountCodById({
      id: hashCode.id,
      status: AccountCodStatus.Concluded
    });

    return await this.userRepository.updateOneUserPassword(
      updateUserPasswordDto
    );
  }*/
}
