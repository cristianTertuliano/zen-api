import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from '@core/base/base-service';

import { DayWeekSchedule, Schedule } from "@core/entity/schedule/schedule.entity";
import { getRepository } from 'typeorm';

import * as moment from 'moment';

export enum DayWeekScheduleUtil {
  WeekDay1 = 'monday',
  WeekDay2 = 'tuesday',
  WeekDay3 = 'wednesday',
  WeekDay4 = 'thursday',
  WeekDay5 = 'friday',
  WeekDay6 = 'saturday',
  WeekDay0 = 'sunday',
}

@Injectable()
export class ScheduleUtil extends BaseService {
  public timeFormat = 'HH:mm:ss';

  constructor(
  ) {
    super();
  }

/**
  * @remarks
  *
  * @param timePeriodStartAt
  * @param timePeriodEndtAt 
  * @returns The user professional object
  *
*/   
  public generateSlots(
    timePeriodStartAt: any,
    timePeriodEndtAt: any,

  ): any[] {
    let timeRefSlot = moment(timePeriodStartAt, this.timeFormat);

    const slots: any[] = [];

    while (moment(timeRefSlot, this.timeFormat).add(30, 'minutes') 
          < moment(timePeriodEndtAt, this.timeFormat)) {

      slots.push({
        timeSlotStartAt: moment(timeRefSlot).format(this.timeFormat),
        timeSlotEndAt: moment(timeRefSlot).add(1, 'hours').format(this.timeFormat)
      });

      timeRefSlot = moment(timeRefSlot).add(30, 'minutes');
    }

    return slots;
  }

/**
  * @remarks
  * This method is async.
  *
  * @param userId
  * @param dayWeek 
  * @returns void
  *
*/
  public async checkValidDayWeek(
    userId: string,
    dayWeek: DayWeekSchedule,

  ): Promise<void> {
    if (await getRepository(Schedule).findOne({
      userId: userId,
      dayWeek: dayWeek,
    })) {
      throw new BadRequestException(
        'Já existe um planejamento de agenda para este dia da semana e profissional'
      );
    }    
  }

/**
  * @remarks
  *
  * @param timePeriodStartAt
  * @param timePeriodEndtAt 
  * @returns void
  *
*/  
  public checkValidRangeTimeAt(
    timePeriodStartAt: any,
    timePeriodEndtAt: any,
  ): void {
    if (!moment(timePeriodStartAt, this.timeFormat, true).isValid() || 
        !moment(timePeriodEndtAt, this.timeFormat, true).isValid()) {
      throw new BadRequestException(
        'os períodos precisam estar no padrão: HH:mm:ss (Exemplo: 17:30:00)'
      );
    }

    if (moment(timePeriodStartAt, this.timeFormat) > moment(timePeriodEndtAt, this.timeFormat)) {
      throw new BadRequestException(
        'o range de período está incorreto'
      );
    }
  }
}