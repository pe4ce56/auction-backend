import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from 'src/common/data.enum';
import { Any, Between, In, LessThan, LessThanOrEqual, MoreThanOrEqual, Raw, Repository, UpdateResult } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction, Status } from './entities/auction.entity';
import { History } from './entities/history.entity';
import { format } from 'date-fns';

@Injectable()
export class AuctionService {

  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
    @InjectRepository(History)
    private historyRepository: Repository<History>
  ) { }

  create(createAuctionDto: any): Promise<Auction> {
    return this.auctionRepository.save(createAuctionDto);
  }

  findAll(): Promise<Auction[]> {
    return this.auctionRepository.find({
      relations: ['product', 'product.category', 'product.images'],
    })
  }

  filter(sort: Filter, category: number[], price: number[]): Promise<Auction[]> {
    // init where clause with category from param
    let where: { [k: string]: any } = {
      product: {
        ...(category?.length > 0) && {
          category: {
            id: In(category || [])
          }
        },
        //where between price
        price: Raw(alias => `${alias} >= ${price[0] || 0}` +
          (price.length === 2 ? ` AND ${alias} <= ${price[1]}` : ''))
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
      relations: ['product', 'product.category', 'product.images', 'histories'],
      where: {
        id: id
      },
      order: {
        histories: {
          price: "asc"
        }
      }
    })
  }

  update(id: number, auction: Auction): Promise<Auction> {
    return this.auctionRepository.save(auction);
  }

  remove(id: number) {
    return this.auctionRepository.delete(id)
  }

  findAllHistory(): Promise<History[]> {
    return this.historyRepository.find()
  }

  bid(id: number, userId: number, price: number): Promise<History> {
    return this.historyRepository.save({
      user: userId,
      price: price.toString(),
      auction: { id: id }
    })
  }
  updateStatus(id: number, status: Status): Promise<UpdateResult> {
    return this.auctionRepository.update(id, { status: status })
  }


  checkCloseStatus(): Promise<UpdateResult> {
    return this.auctionRepository.update({
      end_date: LessThanOrEqual(new Date()),
      status: Status.OPEN,
    }, { status: Status.CLOSE })
  }
  checkOpenStatus(): Promise<UpdateResult> {
    return this.auctionRepository.update({
      start_date: LessThanOrEqual(new Date()),
      end_date: MoreThanOrEqual(new Date()),
      status: Status.PENDING,
    }, {
      status: Status
        .OPEN
    })
  }
}
