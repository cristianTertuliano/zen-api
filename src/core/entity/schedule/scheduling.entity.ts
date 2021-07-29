import {
  Column,
  Entity,
  RelationId, 
  Index,
  ManyToOne,
} from "typeorm";

import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { DayWeekSchedule } from "@core/entity/schedule/schedule.entity";
import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";

@Entity()
export class Scheduling extends BaseResourceEntity {

  // Relations One to Many
  @ManyToOne(() => Account, account => account.schedulings)
  account: Account;  

  @ManyToOne(() => User, user => user.schedulingsPatient)
  patient: User;

  @ManyToOne(() => User, user => user.schedulingsProfessional)
  professional: User;

  // Columns
  @Column()
  @IsOptional()
  @IsString()
  @RelationId((scheduling: Scheduling) => scheduling.account)
  accountId: string;

  @Column()
  @IsOptional()
  @IsString()  
  @RelationId((scheduling: Scheduling) => scheduling.patient)  
  patientId: string;

  @Column()
  @IsOptional()
  @IsString()  
  @RelationId((scheduling: Scheduling) => scheduling.professional)  
  professionalId: string;  

  @Index()
  @Column('enum', { enum: DayWeekSchedule })
  @IsNotEmpty()
  @IsEnum(DayWeekSchedule)
  @IsIn([
    DayWeekSchedule.Monday,
    DayWeekSchedule.Tuesday,
    DayWeekSchedule.Wednesday,
    DayWeekSchedule.Thursday,
    DayWeekSchedule.Friday,
    DayWeekSchedule.Saturday,
    DayWeekSchedule.Sunday,  
  ])  
  dayWeek: DayWeekSchedule;

  @Index()
  @Column({
    type: 'datetime',
    precision: 0,
    nullable: true,
  })
  @IsNotEmpty()
  @IsDateString()
  dayAt: Date;

  @Index()
  @IsNotEmpty()  
  @Column({
    type: 'time'
  })
  @IsNotEmpty()
  timeStartAt: Date;

  @Index()
  @IsNotEmpty()
  @Column({
    type: 'time'
  })
  @IsNotEmpty()
  timeEndAt: Date;
}