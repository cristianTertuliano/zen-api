import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
  IsIn,
  IsOptional,
} from 'class-validator';

import { GenderUser, TypeUser } from '@core/entity/user/user.entity';

export class SignupDto {

  @IsOptional()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)  
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(TypeUser)
  @IsIn([
    TypeUser.Patient,
    TypeUser.Professional,
  ])  
  type: TypeUser;

  @IsNotEmpty()
  @IsEnum(GenderUser)
  @IsIn([
    GenderUser.Female,
    GenderUser.Male,
    GenderUser.NotBinary,
  ])  
  gender: GenderUser;
}
