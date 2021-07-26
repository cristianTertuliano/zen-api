import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { User } from "@core/entity/user/user.entity";

/*
import {
  CreateUserDTO,
  UpdateUserPasswordDto
} from 'src/shared/dto/user/user.dto';
import { GetAuthenticateDto } from 'src/shared/dto/account/account.dto';*/

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /* Create one user 
  async createOneUser(
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    createUserDTO.salt = await bcrypt.genSalt();

    createUserDTO.password = await this.generateHashPassword(
      createUserDTO.password, 
      createUserDTO.salt
    );

    try {
      return await this.save(createUserDTO);
    } catch(err) {
      throw new InternalServerErrorException();
    }
  }*/

  /* update password user 
  async updateOneUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {

    const user = await this.findOne({id: updateUserPasswordDto.userId}, {
      select: [
        'id',
        'salt',
        'password'
      ],
    });

    if (user) {
      user.password = await this.generateHashPassword(
        updateUserPasswordDto.password, user.salt
      );
    }

    try {
      const userUpdated = await this.save(user);

      delete userUpdated.salt;
      delete userUpdated.password;

      return userUpdated;
    } catch(err) {
      throw new InternalServerErrorException();
    }
  }  */

  /* Check credentials 
  async checkCredentials(getAuthenticateDto: GetAuthenticateDto): Promise<User> {
    const { email, password } = getAuthenticateDto;

    const user = await this.findOne({email: email}, {
      select: [
        'id',
        'salt',
        'password'
      ],
    });

    if (user && await this.isValidPassword(password, user)) {
      return user;
    } else {
      return null;
    }
  }*/

  /* Generate hash password 
  public generateFullName(
    firstName: string,
    lastName: string,

  ): string {
    return firstName.trim() + ' ' + lastName.trim();
  } */

  /* Generate hash password
  private async generateHashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  } */

  /* Is Valid password 
  private async isValidPassword(
    password: string,
    user: User
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }  */
}