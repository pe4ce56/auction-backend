import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, ParseArrayPipe } from '@nestjs/common';
import { filter } from 'rxjs';
import { Public } from 'src/auth/jwt-auth.guard';
import { Filter } from 'src/common/data.enum';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';


@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) { }

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
  ) {
    try {
      return this.auctionService.filter(sort, category)
    } catch (e) {
      console.log(e)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Get('/category/:category')
  async findByCategory(@Param('category') category: string) {
    try {
      const auction = await this.auctionService.findByCategory(+category);
      if (!auction) {
        throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
      }
      return auction
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {

      const auction = await this.auctionService.findOne(+id)
      if (!auction) {
        throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
      }
      return auction

    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }


  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.auctionService.findOne(+id)
    if (!auction) {
      throw new HttpException('auction Not Found', HttpStatus.BAD_REQUEST);
    }
    auction.start_date = updateAuctionDto.start_date
    auction.end_date = updateAuctionDto.end_date
    auction.show_document = updateAuctionDto.show_document
    auction.product.id = updateAuctionDto.product
    return this.auctionService.update(+id, auction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }
}
