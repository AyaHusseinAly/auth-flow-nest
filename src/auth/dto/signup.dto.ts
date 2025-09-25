import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()   
  email: string;

  @IsString() @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
  })
  password: string;

  @IsString() @MinLength(3) 
  fullName: string;
  
}