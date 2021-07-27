import { Column, Entity, OneToOne, RelationId, Index } from "typeorm";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";

@Entity()
export class Schedule extends BaseResourceEntity {

  // Relations One to One
  @OneToOne(() => Account, account => account.schedule)
  account: Account;

  @OneToOne(() => User, user => user.schedule)
  user: User;  

  // Columns
  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((schedule: Schedule) => schedule.account)
  accountId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((schedule: Schedule) => schedule.user)
  professionalId: string;
}