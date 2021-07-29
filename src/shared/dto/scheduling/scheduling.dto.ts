import { DayWeekSchedule } from "@core/entity/schedule/schedule.entity";

import { 
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
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