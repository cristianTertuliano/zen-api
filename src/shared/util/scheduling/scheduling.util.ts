import { Injectable } from '@nestjs/common';

import { BaseService } from '@core/base/base-service';

import { ScheduleGetDto } from 'src/shared/dto/schedule/schedule.dto';
import { SlotsTimeInterface } from 'src/shared/interfaces/user/professional.interface';
import { SchedulingService } from '@module/scheduling/scheduling.service';

@Injectable()
export class SchedulingUtil extends BaseService {
  constructor(
    private schedulingService: SchedulingService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param userId
  * @param scheduleGetDto
  * @param slotsProfessional 
  * 
  * @returns list slots available
  *
*/
  public async generateSlotsAvaiable(
    professionalId: string,
    scheduleGetDto: ScheduleGetDto,
    slotsProfessional: SlotsTimeInterface[]

  ): Promise<SlotsTimeInterface[]> {

    const slotsAvaiable: SlotsTimeInterface[] = [];

    // verify exist scheduling for day especific
    const schedulings = await this.schedulingService.findAllByProfessional(
      professionalId, { 
        dayAt: scheduleGetDto.dayAt,
        dayWeek: scheduleGetDto.dayWeek,
      }
    );

    // remove slots used
    for (let indexSlot = 0; slotsProfessional.length > indexSlot; indexSlot++) {
      let insertSlot = true;

      for (const scheduling of schedulings) {
        if ((scheduling.timeStartAt >= slotsProfessional[indexSlot].timeSlotStartAt && 
        scheduling.timeStartAt <= slotsProfessional[indexSlot].timeSlotEndAt) || 
        (scheduling.timeEndAt <= slotsProfessional[indexSlot].timeSlotEndAt && 
        scheduling.timeEndAt >= slotsProfessional[indexSlot].timeSlotStartAt)) {
          delete slotsProfessional[indexSlot];
        }
      }

      if (insertSlot) {
        slotsAvaiable.push(slotsProfessional[indexSlot]);
      }
    }

    return slotsAvaiable;
  }
}