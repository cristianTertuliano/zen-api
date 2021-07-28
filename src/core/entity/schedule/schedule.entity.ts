import {
  Column,
  Entity,
  OneToOne,
  RelationId, 
  Index,
  ManyToOne,
} from "typeorm";

import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { BaseResourceEntity } from "@core/base/base-entity";
import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";

export enum DayWeekSchedule {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

@Entity()
export class Schedule extends BaseResourceEntity {

  // Relations One to One
  @OneToOne(() => Account, account => account.schedule)
  account: Account;

  // Relations One to Many
  @ManyToOne(() => User, user => user.schedules)
  user: User;

  // Columns
  @Column()
  @IsOptional()
  @IsString()
  @RelationId((schedule: Schedule) => schedule.account)
  accountId: string;

  @Column()
  @IsOptional()
  @IsString()  
  @RelationId((schedule: Schedule) => schedule.user)  
  userId: string;

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

  // este campos poderia ser construido um recurso que 
  // esta data especifica sobrescreva um dia da semana 
  // exemplo: Atendo toda segunda feira das 8:00 as 12:00
  // mas uma segunda feira especifica eu faço um outro horário
  @Index()
  @Column({
    type: 'datetime',
    precision: 0,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dayEspecificAt: Date;

  @Index()  
  @Column({
    type: 'time'
  })
  @IsNotEmpty()
  timePeriodStartAt: Date;

  @Index()  
  @Column({
    type: 'time'
  })
  @IsNotEmpty()
  timePeriodEndAt: Date;  

  @Column({ 
    type: 'json',
    nullable: true
  })
  @IsOptional()
  slots: Array<object>

  // poderia usar este campo para flexibilizar o tamanho das sesões
  @Column({ 
    default: 1,
    nullable: true
  })
  @IsOptional()
  @IsNumber()
  hourSession: number;

  // dia bloqueado (pode ser um dia especifico ou dia da semana)
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isBlocked: boolean;
}