import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { History } from './entities/history.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { Image } from 'src/product/entities/image.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, History, Product, Image, Category])],
  controllers: [AuctionController],
  providers: [AuctionService, ProductService]
})
export class AuctionModule { }
