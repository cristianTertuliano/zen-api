
import { getRepository } from 'typeorm';
import { ScheduleGetDto } from 'src/shared/dto/schedule/schedule.dto';
import { SlotsTimeInterface } from 'src/shared/interfaces/user/professional.interface';
import { Scheduling } from '@core/entity/schedule/scheduling.entity';

class SchedulingUtil {

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

    const schedulings = await getRepository(Scheduling).find({
      where: {
        professionalId: professionalId,
        dayWeek: scheduleGetDto.dayWeek,
        dayAt: scheduleGetDto.dayAt,        
      }
    });

    // remove slots used
    for (let indexSlot = 0; slotsProfessional.length > indexSlot; indexSlot++) {
      let insertSlot = true;

      for (const scheduling of schedulings) {
        if ((scheduling.timeStartAt >= slotsProfessional[indexSlot].timeSlotStartAt && 
        scheduling.timeStartAt <= slotsProfessional[indexSlot].timeSlotEndAt) || 
        (scheduling.timeEndAt <= slotsProfessional[indexSlot].timeSlotEndAt && 
        scheduling.timeEndAt >= slotsProfessional[indexSlot].timeSlotStartAt)) {
          insertSlot = false;
        }
      }

      if (insertSlot) {
        slotsAvaiable.push(slotsProfessional[indexSlot]);
      }
    }

    return slotsAvaiable;
  }
}

export default new SchedulingUtil();