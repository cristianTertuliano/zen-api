import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { ScheduleService } from '@module/schedule/schedule.service';

import UserUtil from 'src/shared/util/user/user';
import ScheduleUtil from 'src/shared/util/schedule/schedule';

import { SchedulingPostDto } from 'src/shared/dto/scheduling/scheduling.dto';

import { Scheduling } from '@core/entity/schedule/scheduling.entity';
import { TypeUser } from '@core/entity/user/user.entity';
 
@Injectable()
export class SchedulingService extends BaseService {
  constructor(
    @InjectRepository(Scheduling)
    private schedulingRepository: Repository<Scheduling>,
    private scheduleService: ScheduleService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param schedulingPostDto
  * @returns The object scheduling
  *
*/
  public async create(
    schedulingPostDto: SchedulingPostDto,

  ): Promise<Scheduling | any> {
    const dayWeek = ScheduleUtil.checkDayWeekByDay(schedulingPostDto.dayAt);

    const professional = await UserUtil.checkValidUser(
      schedulingPostDto.professionalId, TypeUser.Professional
    );

    const patient = await UserUtil.checkValidUser(
      schedulingPostDto.patientId, TypeUser.Patient
    );
 
    // slots avaiable
    const slotsAvaiable = await this.scheduleService.findAll(professional.id, {
      dayAt: schedulingPostDto.dayAt,
      dayWeek: dayWeek,
    });

    let slotSelected: any = null;

    for (const slot of slotsAvaiable.slots) {
      if (slot.timeSlotStartAt === schedulingPostDto.timeAt) {
        slotSelected = slot;
      }
    }

    if (!slotSelected) {
      throw new BadRequestException(
        'O horário '+schedulingPostDto.timeAt+' informado não está disponível'
      );
    }

    schedulingPostDto.accountId = patient.accountId;
    schedulingPostDto.timeStartAt = slotSelected.timeSlotStartAt;
    schedulingPostDto.timeEndAt = slotSelected.timeSlotEndAt;
    schedulingPostDto.dayWeek = dayWeek,
    schedulingPostDto.dayAt = schedulingPostDto.dayAt;

    delete schedulingPostDto.timeAt;

    return this.schedulingRepository.save(schedulingPostDto);
  }  
}

