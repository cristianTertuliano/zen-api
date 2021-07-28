import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeUser, User } from '@core/entity/user/user.entity';

import { BaseService } from '@core/base/base-service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,    
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param void
  * @returns list patients
  *
*/
  public async findAllPatient(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        type: TypeUser.Patient
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
  * @param void
  * @returns list professionals
  *
*/
public async findAllProfessional(): Promise<User[]> {
  return await this.userRepository.find({
    where: {
      type: TypeUser.Professional
    },
    relations: [
      'account',
      'professional',
      'schedule',
    ],
  });
}  

/**
  * @remarks
  * This method is async.
  *
  * @param SignupDto
  * @returns The account object
  *
*/
public async create(
  user: any

): Promise<User> {

  const secret: {
    salt: string,
    password: string,
  } = await this.generateSecret(user.password);

  user.fullName = this.generateFullName(
    user.firstName,
    user.lastName,
  ),

  user.salt = secret.salt;
  user.password = secret.password;

  const userCreated = await this.userRepository.save(user);

  delete userCreated.salt;
  delete userCreated.password;

  return userCreated;
}

/**
  * @remarks
  * This method is async.
  *
  * @param firstName
  * @param lastName 
  * @returns string fullname
  *
*/
  private generateFullName(
    firstName: string,
    lastName: string,

  ): string {
    return firstName.trim() + ' ' + lastName.trim();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param password
  * @returns string hash
  *
*/  
  private async generateSecret(
    password: string,

  ): Promise<any> {
    const salt = await bcrypt.genSalt();

    return {
      salt: salt,
      password: await bcrypt.hash(password, salt),
    }
  }
}
