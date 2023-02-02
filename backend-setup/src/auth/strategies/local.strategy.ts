import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthSignInDto } from '../dto/auth-signin.dto';
import { UserJwtResponse } from '../user-jwt-response.interface';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super();
  }

  //method to create a token for the user after signing in
  async signInAuth(authSignInDto: AuthSignInDto): Promise<UserJwtResponse> {
    const userResult = await this.authService.signIn(authSignInDto);
    if (!userResult) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userResult };
    const accessToken = await this.jwtService.sign(payload);
    const signInResponse: UserJwtResponse = {
      user: userResult,
      accessToken,
    };
    return signInResponse;
  }
}
