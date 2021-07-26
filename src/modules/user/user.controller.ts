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
/*
  @UseGuards(AuthGuard())
  @Get('/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getOneUser(
    @Param('userId') userId: string,
  ): Promise<User> {
    return await this.userService.getOneUserById(userId);
  }

  @UseGuards(AuthGuard())
  @Put('/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateOneUser(
    @Param('userId') userId: string,
    @Body() user: User
  ): Promise<User> {
    user.id = userId;
    return await this.userService.updateOneUserById(user);
  }*/
}
