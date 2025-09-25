import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()   
  email: string;

  @IsString() @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
  })
  hashedPassword: string;

  @IsString() @MinLength(3) 
  fullName: string;
  
}