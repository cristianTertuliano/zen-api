import { 
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';

import { BaseController } from '@core/base/base-controller';

import { AccountService } from '@module/account/account.service';
import { UserPatientService } from '@module/patient/patient.service';
import { UserProfessionalService } from '@module/professional/professional.service';

import { SigninDto } from 'src/shared/dto/account/signin.dto';
import {
  SignupDtoPatient,
  SignupDtoProfessional,
} from 'src/shared/dto/account/signup.dto';

import { Account } from '@core/entity/account/account.entity';

@Controller('/account')
export class AccountController extends BaseController {

  constructor(
    protected accountService: AccountService,
    protected userPatientService: UserPatientService,
    protected userProfessional: UserProfessionalService,
  ) {
    super(accountService);
  }

  @Post('/signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getOneAuthenticate(
    @Body() signinDto: SigninDto,
    @Req() req
  ): Promise<any> {
    return await this.accountService.signin(
      signinDto,
      req
    );
  }

  @Post('/signup/patient')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPacient(
    @Body() signupDtoPatient: SignupDtoPatient
  ): Promise<Account> {
    return await this.userPatientService.create(signupDtoPatient);
  }

  @Post('/signup/professional')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProfessional(
    @Body() signupDtoProfessional: SignupDtoProfessional
  ): Promise<Account> {
    return await this.userProfessional.create(signupDtoProfessional);
  }
}
