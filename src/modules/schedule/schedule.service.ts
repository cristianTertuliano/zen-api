import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';

import {
  Schedule,
} from '@core/entity/schedule/schedule.entity';

import { DayWeekScheduleUtil, ScheduleUtil } from 'src/shared/util/schedule/schedule.util';
import { SchedulingUtil } from 'src/shared/util/scheduling/scheduling.util';
import { UserProfessionalUtil } from 'src/shared/util/user/professional.util';
import { ScheduleGetDto, ScheduleUpdateDto } from 'src/shared/dto/schedule/schedule.dto';

import * as moment from 'moment';

@Injectable()
export class ScheduleService extends BaseService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private scheduleUtil: ScheduleUtil,
    private schedulingUtil: SchedulingUtil,
    private userProfessionalUtil: UserProfessionalUtil,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param professionalId
  * @returns The list schedule of professional
  *
*/
  public async findAll(
    userId: string,
    scheduleGetDto: ScheduleGetDto,

  ): Promise<Schedule | any> {
    let schedule: Schedule;

    await this.userProfessionalUtil.checkValidProfessional(userId);

    const dayWeek = DayWeekScheduleUtil[
      'WeekDay' + moment(scheduleGetDto.dayAt).weekday()
    ];

    schedule = await this.scheduleRepository.findOne({
      userId: userId,
      dayWeek: dayWeek,
    });

    if (schedule && schedule.isBlocked) {
      return {
        code: '200',
        message: 'Este dia está bloqueado na agenda deste profissional'
      };
    }

    if (!schedule) {
      return {
        code: '200',
        message: 'Este profissional não atende neste dia'
      };
    }    
 
    const slots: any[] = [];

    schedule.slots.forEach(slot => slots.push(slot));
  
    schedule.slots = await this.schedulingUtil.generateSlotsAvaiable(
      userId,
      scheduleGetDto,
      slots,
    );  
  
    return schedule;
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

    const professional = await this.userProfessionalUtil.checkValidProfessional(userId);

    await this.scheduleUtil.checkValidDayWeek(userId, scheduleBody.dayWeek);

    this.scheduleUtil.checkValidRangeTimeAt(
      scheduleBody.timePeriodStartAt,
      scheduleBody.timePeriodEndAt,
    );

    scheduleBody.accountId = professional.accountId;
    scheduleBody.userId = professional.userId;

    scheduleBody.slots = this.scheduleUtil.generateSlots(
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
      this.scheduleUtil.checkValidRangeTimeAt(
        scheduleBody.timePeriodStartAt,
        scheduleBody.timePeriodEndAt,
      );

      scheduleBody.slots = this.scheduleUtil.generateSlots(
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

    await this.scheduleUtil.checkValidDayWeek(schedule.userId, scheduleBody.dayWeek);
 
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
}

