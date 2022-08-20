import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from 'src/common/data.enum';
import { Any, In, Repository, UpdateResult } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction, Status } from './entities/auction.entity';

@Injectable()
export class AuctionService {

  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>
  ) { }

  create(createAuctionDto: any): Promise<Auction> {
    return this.auctionRepository.save(createAuctionDto);
  }

  findAll(): Promise<Auction[]> {
    return this.auctionRepository.find({
      relations: ['product', 'product.category', 'product.images'],
    })
  }

  filter(sort: Filter, category: number[]): Promise<Auction[]> {

    // init where clause with category from param
    let where: { [k: string]: any } = {
      product: {
        ...(category?.length > 0) && {
          category: {
            id: In(category || [])
          }
        }
      }
    }

    // check order
    let order = {};
    switch (sort) {
      case Filter.SedangBerlangsung: {
        where.status = Status.OPEN
        order = {
          start_date: 'desc'
        }
        break;
      }
      case Filter.Segera: {
        where.status = Status.PENDING
        order = {
          start_date: 'asc'
        }
        break;
      }
    }

    return this.auctionRepository.find({
      relations: ['product', 'product.category', 'product.images'],
      where: where,
      order: order
    })
  }

  findByCategory(category: number): Promise<Auction[]> {
    return this.auctionRepository.find({
      relations: ['product', 'product.category', 'product.images'],
      where: {
        product: {
          category: {
            id: category
          }
        }
      }
    })
  }


  findOne(id: number): Promise<Auction> {
    return this.auctionRepository.findOne({
      relations: ['product', 'product.category', 'product.images'],
      where: {
        id: id
      }
    })
  }

  update(id: number, auction: Auction): Promise<Auction> {
    return this.auctionRepository.save(auction);
  }

  remove(id: number) {
    return this.auctionRepository.delete(id)
  }
}
