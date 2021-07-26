import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  RelationId
} from "typeorm";
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { User } from "@core/entity/user/user.entity";
import { Email } from "@core/entity/email/email.entity";
import { UserSession } from "@core/entity/user/user-session.entity";

@Entity()
export class Account extends BaseResourceEntity {
}