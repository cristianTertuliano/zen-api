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

import { UserService } from '@module/user/user.service';
 
// @UseGuards(AuthGuard())
@Controller('/user')
export class UserController extends BaseController {

  constructor(
    protected userService: UserService,
  ) {
    super(userService);
  }

  @Get('/patient')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAllPatient(): Promise<User[]> {
    return await this.userService.findAllPatient();
  }

  @Get('/professional')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAllProfessional(): Promise<User[]> {
    return await this.userService.findAllProfessional();
  }
}
