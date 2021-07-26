import { 
  Controller,
  Param,
  Get,
  Body,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Req,
  Delete,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { AccountService } from '@module/account/account.service';

@Controller('/account')
export class AccountController extends BaseController {

  constructor(
    protected accountService: AccountService,
  ) {
    super(accountService);
  }
}
