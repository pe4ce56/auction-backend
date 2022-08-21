
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionService } from './auction.service';
import { Auction } from './entities/auction.entity';

@Injectable()
export class TasksService {
    constructor(private readonly auctionService: AuctionService) { }

    private readonly logger = new Logger(TasksService.name);

    @Cron(CronExpression.EVERY_MINUTE)
    handleCron() {
        this.auctionService.checkCloseStatus()
        this.auctionService.checkOpenStatus()
        this.logger.debug('Called when the current minute is 1');
    }
}
