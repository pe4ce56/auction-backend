
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategi';
import { LocalStrategy } from './local.strategi';

@Module({
  imports: [
    PassportModule.register({session: true  }),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '24h' },
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
