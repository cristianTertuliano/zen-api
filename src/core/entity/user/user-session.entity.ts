import { Entity, Column, ManyToOne, Index } from 'typeorm';
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
}
