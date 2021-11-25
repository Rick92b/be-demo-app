import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MaxLength(30)
  readonly nome: string;

  @IsString()
  @MaxLength(30)
  readonly cognome: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
