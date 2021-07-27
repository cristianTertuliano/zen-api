import { 
  Controller,
  Body,
  Get,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@core/entity/user/user.entity';

import { BaseController } from '@core/base/base-controller';

import { PatientService } from '@module/patient/patient.service';
 

@Controller('/patient')
export class PatientController extends BaseController {

  constructor(
    protected patientService: PatientService,
  ) {
    super(patientService);
  }
}
