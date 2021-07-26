import { Column, Entity, Index, ManyToOne, RelationId } from "typeorm";
import {
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";

export enum TypeEmail {
  NewAccount = 'new_account',
  RecouverPassword = 'recouver_password',
}

export enum StatusEmail {
  Pending = 'pending',
}

@Entity()
export class Email extends BaseResourceEntity {

  // Relations Many to One
  @ManyToOne(() => Account, account => account.emails)
  account: Account;

  @ManyToOne(() => User, user => user.emails)
  creator: User;

  // Columns
  @Column()
  @RelationId((email: Email) => email.account)
  @IsNotEmpty()  
  accountId: string;

  @Column()
  @RelationId((email: Email) => email.creator)
  @IsNotEmpty()  
  creatorId: string;

  @Index()
  @Column('enum', { enum: TypeEmail })
  @IsNotEmpty()
  @IsEnum(TypeEmail)
  type: TypeEmail;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  fromEmail: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  toEmail: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  template: string;    

  @Column({ default: 0, nullable: true })
  @IsOptional()
  @IsNumber()
  qtdeOpens: number;

  @Column({ default: 0, nullable: true })
  @IsOptional()
  @IsNumber()
  qtdeClicks: number;

  @Index()
  @Column('enum', { enum: StatusEmail })
  @IsNotEmpty()
  @IsEnum(StatusEmail)
  status: StatusEmail;
}