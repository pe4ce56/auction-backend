import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Get("test")
  test(){
    return this.authService.login({username: "damai",password: "damai"});
  }

  
}
