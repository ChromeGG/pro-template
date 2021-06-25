import {
  IsEmail,
  MinLength,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(80)
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
