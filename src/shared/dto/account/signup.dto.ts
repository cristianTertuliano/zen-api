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
import { TypeProfessional } from '@core/entity/user/user-professional.entity';

export class SignupDtoPatient {

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

  @IsOptional()
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

export class SignupDtoProfessional {

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

  @IsOptional()
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

  @IsNotEmpty()
  @IsEnum(TypeProfessional)
  @IsIn([
    TypeProfessional.Coache,
    TypeProfessional.Psychoanalyst,
    TypeProfessional.Psychologist,
    TypeProfessional.Therapist,
  ])  
  professionalType: TypeProfessional;

  @IsNotEmpty()
  @IsString()
  document: string;
}
