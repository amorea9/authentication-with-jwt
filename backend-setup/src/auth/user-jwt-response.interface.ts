import { SignInResponseDto } from './dto/auth-signinresponse.dto';

export interface UserJwtResponse {
  user: SignInResponseDto;
  accessToken: string;
}
