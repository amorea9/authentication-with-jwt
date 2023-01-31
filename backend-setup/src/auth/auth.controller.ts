import { Controller, Post, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { UserJwtResponse } from './user-jwt-response.interface';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //signing up
  @Post('/signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.authService.signUp(authSignUpDto);
  }

  //signing in and authorise
  @Post('/signin')
  async signIn(@Body() authSignInDto: AuthSignInDto): Promise<UserJwtResponse> {
    return this.authService.signInAuth(authSignInDto);
  }
  @Get()
  getUsers() {
    return this.authService.getUsers();
  }
}

// here we are telling the controller to use the service to create a new user and save it to the database, based on the path /auth/signup
