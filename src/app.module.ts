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
    , CategoryModule, AuthModule, ProductModule, AuctionModule, UserModule, TenantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
