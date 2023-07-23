import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersModule } from './brokers/brokers.module';
import { StocksModule } from './stocks/stocks.module';
import {BiddingsGateway} from "./biddings.gateway";

@Module({
  imports: [BrokersModule, StocksModule],
  controllers: [AppController],
  providers: [AppService, BiddingsGateway],
})
export class AppModule {}
