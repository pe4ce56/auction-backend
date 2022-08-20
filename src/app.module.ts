import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Image } from './product/entities/image.entity';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'debian-sys-maint',
      password: 'vtOp0bqRECt71sw4',
      database: 'auction_db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
    , CategoryModule, AuthModule, ProductModule, AuctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
