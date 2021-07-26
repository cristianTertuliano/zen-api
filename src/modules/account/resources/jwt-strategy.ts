import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';
import { IncomingMessage } from 'http';

import { jwtSecret } from '@core/config/jwt-secret.config';
import { JwtPayload } from '@module/account/resources/jwt-payload.interface';

import { AccountService } from '@module/account/account.service';

import { Account } from '@core/entity/account/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private acountService: AccountService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
      secretOrKey: jwtSecret,
    });
  }

  async validate(request: IncomingMessage, payload: JwtPayload, done): Promise<any> {
    const { account, user } = payload;
    const authorization = request?.headers['authorization'];

    if (!authorization || !account.id || !user.id) {
      return done(new UnauthorizedException(), false);
    }

    // valid session
    /*
    const session = await this.acountService.getOneUserSessionByToken(
      authorization
    );*/
 
    /*
    if (!session || session.user.id !== payload.user.id || !session.user.isActive) {
      return done(new UnauthorizedException(), false);
    }

    const acessWorkspace = session.user.acessWorkspaces.find(acces => {
      return acces['isActive'] && acces['isDefault']
    });
 
    const sessionValid = {
      account: await getRepository(Account).findOne(
        payload.account.id
      ),
      workspace: await getRepository(Workspace).findOne(
        acessWorkspace['workspace']
      ),
      user: session.user,
    };    

    if (!sessionValid || !sessionValid.workspace) {
      return done(new UnauthorizedException(), false);
    }

    done(null, sessionValid);*/

    done(null)
  }
}