import { Column, Entity, OneToOne, RelationId, OneToMany, Unique, Index } from "typeorm";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { Email } from '@core/entity/email/email.entity';
import { Account } from "@core/entity/account/account.entity";
import { UserSession } from "@core/entity/user/user-session.entity";
import { UserProfessional } from "@core/entity/user/user-professional.entity";

export enum TypeUser {
  Professional = 'professional',
  Patient = 'patient',
}

export enum GenderUser {
  Female = 'female',
  Male = 'male',
  NotBinary = 'not_binary',
}

@Entity()
@Unique(['email'])
export class User extends BaseResourceEntity {

  // Relations One to One
  @OneToOne(() => Account, account => account.user)
  account: Account;

  @OneToOne(() => UserProfessional, userProfessional => userProfessional.user)
  professional: UserProfessional;  

  // Relations One to many
  @OneToMany(() => Email, email => email.creator)
  emails: Email[]

  @OneToMany(() => UserSession, session => session.user)
  sessions: UserSession[];

  // Columns
  @Column()
  @IsNotEmpty()  
  @IsString()
  @RelationId((user: User) => user.account)
  accountId: string;

  @Column()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)  
  firstName: string;

  @Column()
  @IsOptional()
  @IsString()
  @MinLength(3)  
  @MaxLength(50)  
  lastName: string;

  @Column()
  @IsOptional()
  @IsString()
  @MaxLength(250)  
  fullName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Index()
  @Column('enum', { enum: TypeUser })
  @IsNotEmpty()
  @IsEnum(TypeUser)
  type: TypeUser;

  @Index()
  @Column('enum', { enum: GenderUser })
  @IsNotEmpty()
  @IsEnum(GenderUser)
  gender: GenderUser;

  @Column({ select: false })
  @IsNotEmpty()
  salt: string;

  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}