import { 
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@core/base/base-controller';

import { UserProfessionalService } from '@module/professional/professional.service';
import { User } from '@core/entity/user/user.entity';
 
@UseGuards(AuthGuard('jwt'))
@Controller('/professional')
export class UserProfessionalController extends BaseController {

  constructor(
    protected userProfessionalService: UserProfessionalService,
  ) {
    super(userProfessionalService);
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findAll(): Promise<User[]> {
    return await this.userProfessionalService.findAll();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findOne(
    @Param('id') userId: string,    
  ): Promise<User> {
    return await this.userProfessionalService.findOne(userId);
  }  
}