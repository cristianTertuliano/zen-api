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

export enum TypeProfessional {
  Coache = 'coache',
  Psychoanalyst = 'psychoanalyst',
  Psychologist = 'psychologist',
  Therapist = 'therapist',
}

@Entity()
export class UserProfessional extends BaseResourceEntity {

  // Relations One to One
  @OneToOne(() => Account, account => account.user)
  account: Account;

  @OneToOne(() => User, user => user.professional)
  user: User;  

  // Columns
  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((userProfessional: UserProfessional) => userProfessional.account)
  accountId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((userProfessional: UserProfessional) => userProfessional.user)
  userId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  document: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60000)
  description: string;

  @Index()
  @Column('enum', { enum: TypeProfessional })
  @IsNotEmpty()
  @IsEnum(TypeProfessional)
  type: TypeProfessional;
}