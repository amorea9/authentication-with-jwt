import { IsString, MinLength } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  username: string;
  @IsString()
  @MinLength(8)
  password: string;
}
//the dto is used to validate the data that is sent to the backend and to ensure that the data is in the correct format
