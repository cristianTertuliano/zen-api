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

import { UserProfessionalService } from '@module/professional/professional.service';
 

@Controller('/professional')
export class UserProfessionalController extends BaseController {

  constructor(
    protected userProfessionalService: UserProfessionalService,
  ) {
    super(userProfessionalService);
  }
}