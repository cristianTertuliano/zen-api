import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepository, Repository } from 'typeorm';

import { JwtPayload } from 'src/shared/interfaces/account/jwt-payload.interface';

import { BaseService } from '@core/base/base-service';
import { UserService } from '@module/user/user.service';
import { EmailAccountService } from '@module/email/account/account.service';

import { SigninDto } from 'src/shared/dto/account/signin.dto';
import { User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';
import { UserSession, UserSessionStatus } from '@core/entity/user/user-session.entity';

import * as UAParser from 'ua-parser-js';
import * as bcrypt from 'bcrypt';
import * as requestIp from 'request-ip';



@Injectable()
export class AccountService extends BaseService{
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    private emailAccountService: EmailAccountService,
    private jwtService: JwtService,
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param SigninDto
  * @returns The autorized object
  *
*/
  public async signin(
    signinDto: SigninDto,
    req: any,

  ): Promise<any> {

    const credentialUser = await this.checkCredentials(
      signinDto
    );
    
    if (!credentialUser) {
      throw new UnauthorizedException('credenciais não autorizada');
    }

    const user = await getRepository(User).findOne({
      where: {
        id: credentialUser.id
      },
      relations: [
        'account',
        'professional',
        'schedule',
      ],
    });

    const account = await this.accountRepository.findOne({
      id: user.accountId
    });

    if (!user || !account) {
      throw new UnauthorizedException('erro nas informações contacte o suporte');
    }

    const payload: JwtPayload = { account, user };

    const authorized = {
      accessToken: await this.jwtService.sign(payload),
      typeUser: user.type,
    };

    const UA = await UAParser(req.headers['user-agent']);

    // create session
    await getRepository(UserSession).save({
      account: account,
      user: user,
      token: authorized.accessToken.toString(),
      browser: UA.browser.name,
      os: UA.os.name,
      ip: await requestIp.getClientIp(req),
      status: UserSessionStatus.Validity,
    });

    return authorized;
  }

/**
  * @remarks
  * This method is async.
  *
  * @param signup
  * @returns The account
  *
*/  
  public async signup(signup: any): Promise<Account> {

    if (await getRepository(User).findOne({
      email: signup.email
    })) {
      throw new ConflictException(
        'Email '+ signup.email +' já esta cadastrado'
      );
    }

    // create account
    const account = await this.accountRepository.save({
      isConfirmConfigured: true
    });

    // create user
    signup.accountId = account.id;
    account.user = await this.userService.create(signup);

    // send email
    this.emailAccountService.sendEmailWelcome({
      creatorId: account.user.id,
      accountId: account.user.accountId,
      fullName: account.user.fullName,
      email: account.user.email,
    });

    return account;
  }

/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns Account cod valid
  *
*/
  public async getUserSessionByToken(
    tokenBearer: string

  ): Promise<UserSession> {
    let token = tokenBearer.split(' ')[1];
  
    return await getRepository(UserSession).findOne({
      where: {
        token,
        status: UserSessionStatus.Validity
      },
      relations: [
        'account',
        'user'
      ],
    });
  }

/**
  * @remarks
  * This method is async.
  *
  * @param signinDto
  * @returns The user credentials
  *
*/    
  private async checkCredentials(signinDto: SigninDto): Promise<User> {
    const { email, password } = signinDto;

    const user = await getRepository(User).findOne({email: email}, {
      select: [
        'id',
        'salt',
        'password'
      ],
    });

    if (user && await this.isValidPassword(password, user)) {
      return user;
    } else {
      return null;
    }
  }

/**
  * @remarks
  * This method is async.
  *
  * @param password
  * @param user 
  * @returns The user is valid password
  *
*/   
  private async isValidPassword(
    password: string,
    user: User
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}