import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepository, Repository } from 'typeorm';

import { BaseService } from '@core/base/base-service';
import { JwtPayload } from '@module/account/resources/jwt-payload.interface';

import { UserRepository } from '@module/user/resources/user.repository';
/*
import {
  SignupDTO,
  CreateCodPasswordDto,
  GetAuthenticateDto,
} from 'src/shared/dto/account/account.dto';

import {
  AccountCod,
  AccountCodStatus,
  AccountCodType
} from '@core/entity/account/account-cod.entity';
import { User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';
import { Workspace } from '@core/entity/workspace/workspace.entity';
import { UserSession, UserSessionStatus } from '@core/entity/user/user-session.entity';

import { EmailAccountService } from '@module/email/email-account.service';

import * as UAParser from 'ua-parser-js';
import * as requestIp from 'request-ip';
import * as md5 from 'md5';*/

@Injectable()
export class AccountService extends BaseService{
  constructor(
    /*
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AccountCod)
    private accountCodRepository: Repository<AccountCod>,
    private jwtService: JwtService,
    private emailAccountService: EmailAccountService,*/
  ) {
    super();
  }

/**
  * @remarks
  * This method is async.
  *
  * @param GetAuthenticateDto
  * @returns The account object
  *

public async getOneAuthenticate(
  getAuthenticateDto: GetAuthenticateDto,
  req: any,

): Promise<any> {
  const credentialUser = await this.userRepository.checkCredentials(
    getAuthenticateDto
  );

  if (!credentialUser) {
    throw new UnauthorizedException('credenciais não autorizada');
  }

  const user = await this.userRepository.findOne({
    id: credentialUser.id
  });

  const account = await this.accountRepository.findOne({
    id: user.accountId
  });

  const workspaceDefault = user.acessWorkspaces.find(w => w['isDefault']);

  const workspace = await this.workspaceRepository.findOne({
    id: workspaceDefault['workspace']
  });

  if (!user || !account || !workspace) {
    throw new UnauthorizedException('erro nas informações contacte o suporte');
  }

  const payload: JwtPayload = { account, workspace, user };

  const authorized = {
    accessToken: await this.jwtService.sign(payload),
    subDomain: workspace.subDomain,
    isConfirmConfigured: account.isConfirmConfigured,
  };

  const UA = await UAParser(req.headers['user-agent']);

  // create session
  await getRepository(UserSession).save({
    account: account,
    workspace: workspace,
    user: user,
    token: authorized.accessToken.toString(),
    browser: UA.browser.name,
    os: UA.os.name,
    ip: await requestIp.getClientIp(req),
    status: UserSessionStatus.Validity,
  });

  return authorized;
}*/

/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns Account cod valid
  *

public async getOneUserSessionByToken(
  tokenBearer: string

): Promise<UserSession> {
  let token = tokenBearer.split(' ')[1];
 
  return await getRepository(UserSession).findOne({
    where: {
      token,
      status: UserSessionStatus.Validity
    },
    relations: [
      'workspace',
      'account',
      'user'
    ],
  });
}*/

/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns account
  *

public async getOneAccountById(
  acountId: string

): Promise<Account> {
  return await this.accountRepository.findOne({
    where: {
      id: acountId
    },
    relations: [
    ],
  });
}*/

/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns account
  *

public async updateOneAccountById(
  acountId: string,
  account: Account,

): Promise<Account> {
  account.id = acountId;
  return await getRepository(Account).save(account);
}
*/
/**
  * @remarks
  * This method is async.
  *
  * @param string
  * @returns Account cod valid
  *

public async getOneAccountCodByHash(
  hashCode: string

): Promise<AccountCod> {

  const accountCod = await this.accountCodRepository.findOne({
    hash: hashCode,
    type: AccountCodType.RecouverPassword,
    status: AccountCodStatus.Pending,
  });

  return accountCod;
}*/

/**
  * @remarks
  * This method is async.
  *
  * @param SignupDTO
  * @returns The account object
  *

  public async createOneAccount(
    signupDTO: SignupDTO

  ): Promise<User> {

    if (await this.userRepository.findOne({
      email: signupDTO.email
    })) {
      throw new ConflictException(
        'Email '+ signupDTO.email +' já esta cadastrado'
      );
    }

    else if (await this.workspaceRepository.findOne({
      subDomain: signupDTO.workSpaceDomain
    })) {
      throw new ConflictException(
        'Workspace '+ signupDTO.workSpaceDomain +' já esta cadastrado'
      );
    }

    // create account
    const account = await this.accountRepository.save({
      planId: '9541e591-ae90-4fcc-bb8c-d6d14536479c'
    });

    // create workspace
    const w = new Workspace();
    w.isDefault = true;
    w.account = account;
    w.name = signupDTO.workSpaceName;
    w.setWorkspaceDomain(signupDTO.workSpaceDomain);

    const workspace = await this.workspaceRepository.save(w);
     
    // create user
    const u = new User();
    u.account = account;
    u.firstName = signupDTO.firstName;
    u.lastName = signupDTO.lastName;
    u.email = signupDTO.email;
    u.password = signupDTO.password;
    u.isAdmin = true;
    u.acessWorkspaces = [{
      account: account.id,
      workspace: workspace.id,
      isDefault: true,
      isActive: true,
    }];

    u.fullName = this.userRepository.generateFullName(
      u.firstName,
      u.lastName,
    );

    const user = await this.userRepository.createOneUser(u);
 
    // invalid codes register
    await this.accountCodRepository.update({
      creatorId: user.id,
      type: AccountCodType.NewAccount,
      status: AccountCodStatus.Pending,
    }, {
      status: AccountCodStatus.Canceled
    });

    const code = await this.generateCod(user.id);

    // create new cod account
    await this.accountCodRepository.save({
      accountId: user.accountId,
      creatorId: user.id,
      type: AccountCodType.NewAccount,
      status: AccountCodStatus.Pending,
      code: code,
    });

    delete user.salt;
    delete user.password;

    return user;
  }*/


/**
  * @remarks
  * This method is async.
  *
  * @param CreateAccountDTO
  * @returns The account object
  *

  public async createOneCodResetPassword(
    createCodPasswordDto: CreateCodPasswordDto

  ): Promise<User> {
 
    const user = await this.userRepository.findOne({
      email: createCodPasswordDto.email
    });

    if (!user) {
      throw new InternalServerErrorException('não é possível gerar um código de recuperação');
    }
 
    // find cods of users of recouver password
    const accountCods = await this.accountCodRepository.find({
      creatorId: user.id,
      type: AccountCodType.RecouverPassword,
      status: AccountCodStatus.Pending,
    });
    
    for (const element of accountCods) {
      // canceled cods existis
      await this.accountCodRepository.save({
        id: element.id,
        status: AccountCodStatus.Canceled
      });
    };
 
    // create new cod account
    const acountCod = await this.accountCodRepository.save({
      accountId: user.accountId,
      creatorId: user.id,
      type: AccountCodType.RecouverPassword,
      status: AccountCodStatus.Pending,
      hash: await this.generateHashCod(user.id),
    });

    // send email recover password
    const url = 'http://localhost:4201/reset-password/' + acountCod.hash;

    this.emailAccountService.sendEmailRecoverPassword({
      creatorId: user.id,
      accountId: user.accountId,
      fullName: user.fullName,
      email: user.email,
      hash: acountCod.hash,
      url: url
    });

    delete user.acessWorkspaces;

    return user;
  }*/

/**
  * @remarks
  * This method is async.
  *
  * @param object
  * @returns The account object
  *

  public async updateOneAccountCodById(
    updateOneAccountCodInterface: {
      id: string,
      status: AccountCodStatus
    }
  ): Promise<AccountCod> {
    return this.accountCodRepository.save(updateOneAccountCodInterface);
  }*/

/**
  * @remarks
  * This method is async.
  *
  * @param token
  * @returns User session
  *

  public async deleteOneAuthenticate(token: string): Promise<UserSession> {
    const session = await getRepository(UserSession).findOne({ where: { token } });
    if (!session) {
      throw new NotFoundException();
    }
    return await getRepository(UserSession).remove(session);
  }*/

/**
  * @remarks
  * This method is async.
  *
  * @returns string
  *

  private async generateHashCod(creatorId: string): Promise<string> {
    return md5(creatorId + new Date());
  }*/

/**
  * @remarks
  * This method is async.
  *
  * @returns string 
  *

  private async generateCod(creatorId: string): Promise<string> {
    return Math.random().toString(36).substring(7);
  }*/
}
