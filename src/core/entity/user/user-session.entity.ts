import { Entity, Column, ManyToOne, Index, RelationId } from 'typeorm';
import { IsEnum, IsString, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";

import { Account } from '@core/entity/account/account.entity';
import { User } from '@core/entity/user/user.entity';

export enum UserSessionStatus {
  Validity = 'validity',
  Expired = 'expired',
}

@Entity()
export class UserSession extends BaseResourceEntity {

  // Relations Many to One
  @ManyToOne(() => Account, account => account.sessions)
  account: Account;

  @ManyToOne(() => User, user => user.sessions)
  user: User;

  // Columns
  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((userSession: UserSession) => userSession.account)
  accountId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @RelationId((userSession: UserSession) => userSession.user)
  userId: string;

  @Column({ nullable: true })
  @IsString()
  @MaxLength(255)
  ip: string;

  @Column({ nullable: true })
  @IsString()
  @MaxLength(255)
  browser: string;

  @Column({ nullable: true })
  @IsString()
  @MaxLength(30)
  os: string;  

  @Column("longtext")
  @IsOptional()
  @IsString()  
  token: string;

  @Index()
  @Column('enum', {
    enum: UserSessionStatus,
    default: UserSessionStatus.Validity
  })
  @IsNotEmpty()
  @IsEnum(UserSessionStatus)
  status: UserSessionStatus;
}
