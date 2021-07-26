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

/*
import {
  GetAuthenticateDto,
  CreateCodPasswordDto,
  SignupDTO,
  SingoutDTO,
} from 'src/shared/dto/account/account.dto';

import { User } from '@core/entity/user/user.entity';
import { AccountCod } from '@core/entity/account/account-cod.entity';

import { UserSession } from '@core/entity/user/user-session.entity';
import { Account } from '@core/entity/account/account.entity';*/


@Controller('/account')
export class AccountController extends BaseController {

  constructor(
    protected accountService: AccountService,
  ) {
    super(accountService);
  }

/*
  @UseGuards(AuthGuard())
  @Get('/:acountId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getOneAccount(
    @Param('acountId') acountId: string,
  ): Promise<Account> {
    return await this.accountService.getOneAccountById(acountId);
  }

  @UseGuards(AuthGuard())
  @Put('/:acountId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateOneAccount(
    @Param('acountId') acountId: string,
    @Body() account: Account
  ): Promise<Account> {
    return await this.accountService.updateOneAccountById(acountId, account);
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createOneAccount(
    @Body() signupDTO: SignupDTO
  ): Promise<User> {
    return await this.accountService.createOneAccount(signupDTO);
  }

  @Post('/signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getOneAuthenticate(
    @Body() getAuthenticateDto: GetAuthenticateDto,
    @Req() req
  ): Promise<any> {
    return await this.accountService.getOneAuthenticate(
      getAuthenticateDto,
      req
    );
  }

  @Delete('/singout')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async deleteOneAuthenticate(
    @Body() singoutDTO: SingoutDTO
  ): Promise<UserSession> {
    return await this.accountService.deleteOneAuthenticate(singoutDTO.token);
  }

  @UseGuards(AuthGuard())
  @Get('/session/token')
  async getOneUserSessionByToken(
    @Req() req
  ): Promise<UserSession> {
    return await this.accountService.getOneUserSessionByToken(req.headers.authorization);
  }
*/

}
