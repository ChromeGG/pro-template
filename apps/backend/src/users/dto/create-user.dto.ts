import {
  IsEmail,
  MinLength,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(80)
  readonly password: string;

  @IsBoolean()
  readonly isAdmin: boolean;
}
