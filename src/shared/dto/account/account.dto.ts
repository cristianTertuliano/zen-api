import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

/* get one authenticate 
export class SingoutDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
*/
/* get one authenticate 
export class GetAuthenticateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string
}
*/
/* signup 
export class SignupDTO {

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
  password: string

  @IsOptional()
  acessWorkspaces: Array<object>

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  workSpaceName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)  
  workSpaceDomain: string;
}
*/
/* create cod reset password password 
export class CreateCodPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
*/