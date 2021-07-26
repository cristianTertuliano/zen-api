import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional
} from 'class-validator';
import { Account } from '@core/entity/account/account.entity';


/* create user deto 
export class CreateUserDTO {

  @IsOptional()
  account: Account;

  @IsOptional()
  salt: string;

  @IsOptional()
  isAdmin: boolean;  

  @IsOptional()
  acessWorkspaces: Array<object>

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
  @MinLength(8)
  @MaxLength(20)
  password: string
}*/

/* update user password 
export class UpdateUserPasswordDto {
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  confirmPassword: string
}
*/