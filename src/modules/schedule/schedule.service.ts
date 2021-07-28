import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import {
  Schedule,
  DayWeekSchedule,
} from '@core/entity/schedule/schedule.entity';
import { UserProfessional } from '@core/entity/user/user-professional.entity';

import * as moment from 'moment';
import { User } from '@core/entity/user/user.entity';
import { ScheduleUpdateDto } from 'src/shared/dto/schedule/update.dto';
import { scheduled } from 'rxjs';

@Injectable()
export class ScheduleService extends BaseService {
  public timeFormat = 'HH:mm:ss';

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param professionalId
  * @param scheduleBody 
  * @returns The schedule object
  *
*/
  public async create(
    userId: string,
    scheduleBody: Schedule,

  ): Promise<Schedule> {

    const professional = await this.checkValidProfessional(userId);

    await this.checkValidDayWeek(userId, scheduleBody.dayWeek);

    this.checkValidRangeTimeAt(
      scheduleBody.timePeriodStartAt,
      scheduleBody.timePeriodEndAt,
    );

    scheduleBody.accountId = professional.accountId;
    scheduleBody.userId = professional.userId;

    scheduleBody.slots = this.generateSlots(
      scheduleBody.timePeriodStartAt,
      scheduleBody.timePeriodEndAt,      
    );

    return this.scheduleRepository.save(scheduleBody);
  }

/**
  * @remarks
  * This method is async.
  *
  * @param scheduleId
  * @param scheduleBody 
  * @returns The schedule object
  *
*/
  public async update(
    scheduleId: string,
    scheduleBody: ScheduleUpdateDto,

  ): Promise<Schedule> {
    scheduleBody.id = scheduleId;

    if (scheduleBody.timePeriodStartAt && 
        scheduleBody.timePeriodEndAt) {
      this.checkValidRangeTimeAt(
        scheduleBody.timePeriodStartAt,
        scheduleBody.timePeriodEndAt,
      );

      scheduleBody.slots = this.generateSlots(
        scheduleBody.timePeriodStartAt,
        scheduleBody.timePeriodEndAt,      
      );    
    } else {
      delete scheduleBody.timePeriodEndAt;
      delete scheduleBody.timePeriodStartAt;
    }

    const schedule = await this.scheduleRepository.findOne({
      id: scheduleBody.id,
    });

    await this.checkValidDayWeek(schedule.userId, scheduleBody.dayWeek);
 
    await this.scheduleRepository.save(scheduleBody);

    return await this.scheduleRepository.findOne({
      id: scheduleBody.id,
    });
  }  

/**
  * @remarks
  * This method is async.
  *
  * @param scheduleId
  * @returns void
  *
*/
public async delete(
  scheduleId: string,

): Promise<void> {
  await getRepository(Schedule).delete(scheduleId);
} 

/**
  * @remarks
  *
  * @param timePeriodStartAt
  * @param timePeriodEndtAt 
  * @returns The user professional object
  *
*/   
  private generateSlots(
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
  * @returns The user professional object
  *
*/  
  private async checkValidProfessional(
    userId: string,

  ): Promise<UserProfessional> {
    const professional = await getRepository(UserProfessional).findOne({
      userId: userId
    });

    if (!professional) {
      throw new BadRequestException(
        'Professional '+ userId +' não encontrado'
      );
    }
    
    return professional;
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
  private async checkValidDayWeek(
    userId: string,
    dayWeek: DayWeekSchedule,

  ): Promise<void> {
    if (await this.scheduleRepository.findOne({
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
  private checkValidRangeTimeAt(
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

