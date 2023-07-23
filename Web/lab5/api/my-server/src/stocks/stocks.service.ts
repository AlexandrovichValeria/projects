import { Injectable } from '@nestjs/common';

import * as apple from "./../../data/stock_history/AAPL.json"
import * as starbucks from "./../../data/stock_history/SBUX.json"
import * as microsoft from "./../../data/stock_history/MSFT.json"
import * as cisco from "./../../data/stock_history/CSCO.json"
import * as qualcomm from "./../../data/stock_history/QCOM.json"
import * as amazon from "./../../data/stock_history/AMZN.json"
import * as tesla from "./../../data/stock_history/TSLA.json"
import * as amd from "./../../data/stock_history/AMD.json"
import * as stocksInfo from "./../../data/stock_info.json";

import {Stock} from "./stocks.model";
import { fullStockInfo } from "./fullStockInfo.model";

const StockNames = {
    "AAPL": apple,
    "SBUX": starbucks,
    "MSFT": microsoft,
    "CSCO": cisco,
    "QCOM": qualcomm,
    "AMZN": amazon,
    "TSLA": tesla,
    "AMD": amd
}

@Injectable()
export class StocksService {
    stocks: Stock[];
    getFullStocks() {
        return stocksInfo;
    }

    getStockData(stockName: string, limit: number = 1000) { //?

        return StockNames.hasOwnProperty(stockName) ? StockNames[stockName].slice(0, limit) : [];

    }
}
