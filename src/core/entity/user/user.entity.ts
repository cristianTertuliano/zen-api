import { Column, Entity, ManyToOne, RelationId, OneToMany, Unique } from "typeorm";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { Email } from '@core/entity/email/email.entity';
import { Account } from "@core/entity/account/account.entity";
import { UserSession } from "@core/entity/user/user-session.entity";

@Entity()
export class User extends BaseResourceEntity {
}