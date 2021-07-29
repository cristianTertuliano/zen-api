import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from '@core/base/base-service';
import { getRepository } from 'typeorm';

import { UserProfessional } from '@core/entity/user/user-professional.entity';

@Injectable()
export class UserProfessionalUtil extends BaseService {

  constructor(
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param userId
  * @returns The user professional object
  *
*/  
  public async checkValidProfessional(
    userId: string,

  ): Promise<UserProfessional> {
    const professional = await getRepository(UserProfessional).findOne({
      userId: userId
    });

    if (!professional) {
      throw new BadRequestException(
        'Professional '+ userId +' não encontrado'
      );
    }

    return professional;
  }
}