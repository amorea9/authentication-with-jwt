import { IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
