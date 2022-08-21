import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, ParseArrayPipe } from '@nestjs/common';
import { filter } from 'rxjs';
import { Public } from 'src/auth/jwt-auth.guard';
import { Filter } from 'src/common/data.enum';
import { AuctionService } from './auction.service';
import { BidAuctionDTO } from './dto/bid-auction.dto';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import CryptoJS from 'crypto-js'
import { decrypt, encrypt } from 'src/common/helper/encrypt.helper';
import { ProductService } from 'src/product/product.service';
import { Status } from './entities/auction.entity';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService,
    private readonly productService: ProductService) { }

  @Public()
  @Post()
  async create(@Body() createAuctionDto: CreateAuctionDto) {
    const auction = await this.productService.findOne(+createAuctionDto.product)
    if (!auction) {
      throw new HttpException('product Not Found', HttpStatus.BAD_REQUEST);
    }
    return this.auctionService.create(createAuctionDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.auctionService.findOne(+id)
    if (!auction) {
      throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
    }
    const product = await this.productService.findOne(+updateAuctionDto.product)
    if (!product) {
      throw new HttpException('product Not Found', HttpStatus.BAD_REQUEST);
    }
    auction.start_date = updateAuctionDto.start_date
    auction.end_date = updateAuctionDto.end_date
    auction.show_document = updateAuctionDto.show_document
    auction.product.id = updateAuctionDto.product
    auction.multiples = updateAuctionDto.multiples.toString()
    if (updateAuctionDto.final_price)
      auction.final_price = updateAuctionDto.final_price.toString()
    return this.auctionService.update(+id, auction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }

  @Public()
  @Get('/get-filter-sort')
  getFilter() {
    const toArray = (enumme) => {
      return Object.keys(enumme)
        .map(key => enumme[key]);
    }
    return toArray(Filter)
  }

  @Public()
  @Get()
  findAll() {
    return this.auctionService.findAll();
  }

  @Public()
  @Get('/filter')
  findFilter(
    @Query('sort')
    sort: Filter,
    @Query('category', new ParseArrayPipe({
      items: Number,
      separator: ',',
      optional: true
    }))
    category: number[],
    @Query('price', new ParseArrayPipe({
      items: Number,
      separator: ',',
      optional: true
    }))
    price: number[],
  ) {
    return this.auctionService.filter(sort, category, price)

  }

  @Public()
  @Get('/category/:category')
  async findByCategory(@Param('category') category: string) {
    const auction = await this.auctionService.findByCategory(+category);
    if (!auction) {
      throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
    }
    return auction

  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const auction = await this.auctionService.findOne(+id)
    if (!auction) {
      throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
    }
    return auction
  }


  /*
  @BID Action  
  */
  @Public()
  @Get("/bid/history")
  findAllHistory() {
    return this.auctionService.findAllHistory();
  }

  @Public()
  @Post('/bid/:id')
  async bid(@Param('id') id: string, @Body() bidAuction: BidAuctionDTO) {
    const auction = await this.auctionService.findOne(+id)
    if (!auction) {
      throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
    }
    if (auction.status !== Status.OPEN) {
      throw new HttpException('auction is not open', HttpStatus.BAD_REQUEST);
    }
    const bid = await this.auctionService.bid(+id, +decrypt(bidAuction.userId), bidAuction.price)
    if (bid) {
      if (auction.final_price && +auction.final_price <= bidAuction.price) {
        this.auctionService.updateStatus(+id, Status.CLOSE)
      }
      return new HttpException('Bid Success', HttpStatus.OK)

    }
    return new HttpException('Bid Erorr', HttpStatus.BAD_GATEWAY);
  }



  /*
    Temporer access Public -> change to client 
  */
  @Public()
  @Get("/test/get-id")
  getId() {
    return encrypt("1")
  }

}
