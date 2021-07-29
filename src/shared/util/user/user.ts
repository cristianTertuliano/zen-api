import { BadRequestException } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { TypeUser, User } from '@core/entity/user/user.entity';

class UserUtil {

/**
  * @remarks
  * This method is async.
  *
  * @param userId
  * @returns The user object
  *
*/  
  public async checkValidUser(
    userId: string,
    type: TypeUser,

  ): Promise<User> {

    const user = await getRepository(User).findOne({
      where: {
        id: userId,
        type: type,
      }
    });

    if (!user) {
      const labelType = type === TypeUser.Professional ? 'Professional' : 'Paciente';  

      throw new BadRequestException(
        labelType + ' '+ userId +' não encontrado'
      );
    }

    return user;
  }
}

export default new UserUtil();