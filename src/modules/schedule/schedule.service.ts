import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';

import { Schedule } from '@core/entity/schedule/schedule.entity';
import { TypeUser } from '@core/entity/user/user.entity';

import UserUtil from 'src/shared/util/user/user';
import ScheduleUtil from 'src/shared/util/schedule/schedule';
import SchedulingUtil from 'src/shared/util/scheduling/scheduling';

import { ScheduleGetDto, ScheduleUpdateDto } from 'src/shared/dto/schedule/schedule.dto';

@Injectable()
export class ScheduleService extends BaseService {
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
  * @returns The list schedule of professional
  *
*/
  public async findAll(
    userId: string,
    scheduleGetDto: ScheduleGetDto,

  ): Promise<Schedule | any> {
    let schedule: Schedule;

    await UserUtil.checkValidUser(userId, TypeUser.Professional);

    const dayWeek = ScheduleUtil.checkDayWeekByDay(scheduleGetDto.dayAt);

    schedule = await this.scheduleRepository.findOne({
      userId: userId,
      dayWeek: dayWeek,
    });

    if (schedule && schedule.isBlocked) {
      throw new BadRequestException(
        'Este dia está bloqueado na agenda deste profissional'
      );
    }

    if (!schedule) {
      throw new BadRequestException(
        'Este profissional não atende neste dia'
      );
    }    

    const slots: any[] = [];

    schedule.slots.forEach(slot => slots.push(slot));

    schedule.slots = await SchedulingUtil.generateSlotsAvaiable(
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

    const user = await UserUtil.checkValidUser(userId, TypeUser.Professional);

    await ScheduleUtil.checkValidDayWeek(userId, scheduleBody.dayWeek);

    ScheduleUtil.checkValidRangeTimeAt(
      scheduleBody.timePeriodStartAt,
      scheduleBody.timePeriodEndAt,
    );

    scheduleBody.accountId = user.accountId;
    scheduleBody.userId = user.id;

    scheduleBody.slots = ScheduleUtil.generateSlots(
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
      ScheduleUtil.checkValidRangeTimeAt(
        scheduleBody.timePeriodStartAt,
        scheduleBody.timePeriodEndAt,
      );

      scheduleBody.slots = ScheduleUtil.generateSlots(
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

    await ScheduleUtil.checkValidDayWeek(schedule.userId, scheduleBody.dayWeek);
 
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

