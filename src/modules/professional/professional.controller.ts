import { 
  Controller,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { UserProfessionalService } from '@module/professional/professional.service';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/professional')
export class UserProfessionalController extends BaseController {

  constructor(
    protected userProfessionalService: UserProfessionalService,
  ) {
    super(userProfessionalService);
  }
}