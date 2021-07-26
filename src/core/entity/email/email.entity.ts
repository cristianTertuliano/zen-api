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

export enum TypeEmail {
  NewAccount = 'new_account',
  RecouverPassword = 'recouver_password',
}

export enum StatusEmail {
  Pending = 'pending',
}

@Entity()
export class Email extends BaseResourceEntity {
}