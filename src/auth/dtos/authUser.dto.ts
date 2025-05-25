import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @MinLength(2)
  @IsEmail()
  @MaxLength(25)
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
