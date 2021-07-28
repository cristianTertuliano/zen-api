import { 
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { UserPatientService } from '@module/patient/patient.service';
import { User } from '@core/entity/user/user.entity';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/patient')
export class UserPatientController extends BaseController {

  constructor(
    protected userPatientService: UserPatientService,
  ) {
    super(userPatientService);
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAll(): Promise<User[]> {
    return await this.userPatientService.findAll();
  }
}
