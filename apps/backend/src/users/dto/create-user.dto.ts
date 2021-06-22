import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
