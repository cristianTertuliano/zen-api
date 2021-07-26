import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from "typeorm";
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { User } from "@core/entity/user/user.entity";
import { Email } from "@core/entity/email/email.entity";
import { UserSession } from "@core/entity/user/user-session.entity";
import { UserProfessional } from "@core/entity/user/user-professional.entity";

@Entity()
export class Account extends BaseResourceEntity {

  // Relations One to One
  @OneToOne(() => User, user => user.account)
  user: User;

  @OneToOne(() => UserProfessional, userProfessional => userProfessional.account)
  userProfessional: UserProfessional;

  // Relations One to many
  @OneToMany(() => Email, email => email.account)
  emails: Email[]

  @OneToMany(() => UserSession, session => session.account)
  sessions: UserSession[];

  // Relations Many to One

  // Columns
  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isSignedContract: boolean;

  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isConfirmConfigured: boolean;

  @Column({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}