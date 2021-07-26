import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { User } from "@core/entity/user/user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

}