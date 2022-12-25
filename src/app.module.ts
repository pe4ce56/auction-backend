import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AuctionModule } from './auction/auction.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { ConfigModule } from '@nestjs/config';
import { LateReasonModule } from './late-reason/late-reason.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
    , CategoryModule, AuthModule, ProductModule, AuctionModule, UserModule, TenantModule, LateReasonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
