import { DayWeekSchedule } from "@core/entity/schedule/schedule.entity";

import { 
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class SchProfessionalGetDto {
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
  dayWeek?: DayWeekSchedule;

  @IsNotEmpty()
  @IsDateString()
  dayAt?: Date;
}

export class SchedulingPostDto {

  @IsOptional()
  @IsString()
  accountId?: string;

  @IsNotEmpty()
  @IsString()
  professionalId?: string;

  @IsNotEmpty()
  @IsString()
  patientId?: string;  

  @IsNotEmpty()
  @IsDateString()
  dayAt?: Date;

  @IsNotEmpty()
  timeAt?: Date;

  @IsOptional()
  @IsString()
  timeStartAt?: Date;

  @IsOptional()  
  @IsString()
  timeEndAt?: Date;

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