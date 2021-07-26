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
 

@Controller('/user')
export class UserController extends BaseController {

  constructor(
    protected userService: UserService,
  ) {
    super(userService);
  }

}
