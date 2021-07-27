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

import { BaseController } from '@core/base/base-controller';

import { UserPatientService } from '@module/patient/patient.service';
 

@Controller('/user-patient')
export class UserPatientController extends BaseController {

  constructor(
    protected userPatientService: UserPatientService,
  ) {
    super(userPatientService);
  }
}
