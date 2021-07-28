import { 
  Controller,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '@core/base/base-controller';

import { UserService } from '@module/user/user.service';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController extends BaseController {

  constructor(
    protected userService: UserService,
  ) {
    super(userService);
  }
}
