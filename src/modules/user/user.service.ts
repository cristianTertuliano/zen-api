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
}
