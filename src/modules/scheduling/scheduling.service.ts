import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';

import { Scheduling } from '@core/entity/schedule/scheduling.entity';
import { SchProfessionalGetDto } from 'src/shared/dto/scheduling/scheduling.dto';
 

@Injectable()
export class SchedulingService extends BaseService {
  constructor(
    @InjectRepository(Scheduling)
    private schedulingRepository: Repository<Scheduling>,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param professionalId
  * @param schProfessionalGetDto
  * @returns The list scheduling perspective professional
  *
*/
  public async findAllByProfessional(
    professionalId: string,
    schProfessionalGetDto: SchProfessionalGetDto,

  ): Promise<Scheduling[]> {
    return this.schedulingRepository.find({
      professionalId: professionalId,
      dayWeek: schProfessionalGetDto.dayWeek,
      dayAt: schProfessionalGetDto.dayAt,
    });
  }
}

