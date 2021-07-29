import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { User } from "@core/entity/user/user.entity";
import { Email } from "@core/entity/email/email.entity";
import { UserSession } from "@core/entity/user/user-session.entity";
import { UserProfessional } from "@core/entity/user/user-professional.entity";
import { Schedule } from "@core/entity/schedule/schedule.entity";
import { Scheduling } from "@core/entity/schedule/scheduling.entity";

@Entity()
export class Account extends BaseResourceEntity {

  // Relations One to One
 
  @OneToOne(() => User, user => user.account)
  @JoinColumn()
  user: User;

  @OneToOne(() => UserProfessional, userProfessional => userProfessional.account)
  professional: UserProfessional;

  @OneToOne(() => Schedule, schedule => schedule.account)
  schedule: Schedule;   

  // Relations One to many
  @OneToMany(() => Email, email => email.account)
  emails: Email[]

  @OneToMany(() => UserSession, session => session.account)
  sessions: UserSession[];

  @OneToMany(() => Scheduling, scheduling => scheduling.account)
  schedulings: Scheduling[];

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