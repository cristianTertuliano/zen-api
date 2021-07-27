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
import { SignupDto } from 'src/shared/dto/account/signup.dto';

import { Account } from '@core/entity/account/account.entity';


@Controller('/account')
export class AccountController extends BaseController {

  constructor(
    protected accountService: AccountService,
  ) {
    super(accountService);
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createOneAccount(
    @Body() signupDto: SignupDto
  ): Promise<Account> {
    return await this.accountService.create(signupDto);
  }
}
