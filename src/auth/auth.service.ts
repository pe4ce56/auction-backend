
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    async validateUser(username: string, pass: string): Promise<any> {
        return {username,userId: 1};
    }
  
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId,role: "admin" };
        return {
          access_token: this.jwtService.sign(payload),
          ...payload
        };
    }
}
