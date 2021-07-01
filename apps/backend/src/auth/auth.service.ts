import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log(pass, user.password);
    console.log(
      'AuthSer-> validateUser',
      await bcrypt.compare(pass, user.password),
    );
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // TODO Add DTO here
  async register(user: any): Promise<any> {
    return this.userService.create(user);
  }

  async login(user: any): Promise<any> {
    // TODO FIX it
    const payload = { email: user.email, id: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
