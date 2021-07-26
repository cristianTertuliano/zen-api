import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { JwtPayload } from '@module/account/resources/jwt-payload.interface';

import { UserRepository } from '@module/user/resources/user.repository';

@Injectable()
export class AccountService extends BaseService{
  constructor(
  ) {
    super();
  }
}