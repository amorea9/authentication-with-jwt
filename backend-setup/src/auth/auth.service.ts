import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { SignInResponseDto } from './dto/auth-signinresponse.dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwtResponse } from './user-jwt-response.interface';

// this is the service that is used to create a new user and save it to the database + other methods useful for authentication

@Injectable()
export class AuthService {
  //injecting the dependencies for the user entity
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { username, password } = authSignUpDto;
    const user = new User();
    user.username = username;
    //generating a salt, to add to the password
    user.salt = await bcrypt.genSalt();
    //making the password secure
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return 'User created successfully';
    } catch (error) {
      if (error.code === '23505') {
        return 'Username already exists';
      } else {
        return 'Something went wrong';
      }
    }
  }
  //a method that takses the password and adds a salt to it
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  //method to validate the username and password
  async signIn(authSignInDto: AuthSignInDto): Promise<SignInResponseDto> {
    const { username, password } = authSignInDto;
    //find the right user
    const user = await User.findOne({ where: { username: username } });
    //if the user exists and the password is correct, return the user
    if (user && user.validatePassword(password)) {
      const userResponse = new SignInResponseDto();
      userResponse.username = user.username;
      userResponse.password = user.password;
      return userResponse;
    } else {
      return null;
    }
  }

  //method to create a token for the user after signing in
  async signInAuth(authSignInDto: AuthSignInDto): Promise<UserJwtResponse> {
    const userResult = await this.signIn(authSignInDto);
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

  //user methods
  getUsers() {
    return this.userRepository.find();
  }
}
