import { 
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";
import { DayWeekSchedule } from "@core/entity/schedule/schedule.entity";

export class ScheduleGetDto {

  @IsNotEmpty()
  @IsDateString()
  dayAt?: Date;

  @IsOptional()
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
  dayWeek?: DayWeekSchedule;  
}

export class ScheduleUpdateDto {

  @IsOptional()
  id?: string;

  @IsOptional()
  account?: Account;

  @IsOptional()
  user?: User;

  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsString()  
  userId?: string;

  @IsOptional()
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
  dayWeek?: DayWeekSchedule;

  @IsOptional()
  @IsDateString()
  dayEspecificAt?: Date;

  @IsOptional()
  timePeriodStartAt?: Date;

  @IsOptional()
  timePeriodEndAt?: Date;  

  @IsOptional()
  hourSession?: number;

  @IsOptional()
  slots: Array<object>
}