import { Controller, Get, Param, Post } from "@nestjs/common";
import { Stock } from './stocks.model';
import {StocksService} from "./stocks.service";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {

    }
    @Get()
    getFullStocks() {
        //console.log(this.stocksService.getFullStocks())
        return this.stocksService.getFullStocks();
    }
    @Get(':stockName')
    getStock(@Param('stockName') stockName: string) {
        //console.log(stockName);
        return this.stocksService.getStockData(stockName);
    }
}
