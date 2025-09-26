import { IsEmail, IsString, IsUUID } from 'class-validator';

export class SigninDto {
  @IsEmail()   
  email: string;

  @IsString()
  password: string;

  @IsUUID()
  deviceId: string;
  
}