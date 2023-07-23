
import { Stock } from './stocks/stocks.model';
import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';

import * as apple from "./../data/stock_history/AAPL.json"
import * as starbucks from "./../data/stock_history/SBUX.json"
import * as microsoft from "./../data/stock_history/MSFT.json"
import * as cisco from "./../data/stock_history/CSCO.json"
import * as qualcomm from "./../data/stock_history/QCOM.json"
import * as amazon from "./../data/stock_history/AMZN.json"
import * as tesla from "./../data/stock_history/TSLA.json"
import * as amd from "./../data/stock_history/AMD.json"
import * as brokers from "./../data/brokerList.json"

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


@WebSocketGateway({cors: '*:*'})
export class BiddingsGateway {
    private isBiddingGoing = false;
    private brokersState = [];
    private allPricesSinceBiddingsStart = [];

    @WebSocketServer()
    server: any;

    sendData(server: any, data: any) {
        server.emit('receive-stocks-info', data);
    }

    sendStocksHistoryData(server: any, data: any) {
        // console.log("history data", data)
        server.emit('receive-stocks-history', data);
    }

    //sendBrokerData(server: any, data: any){

    //}

    getCertainData(stockName: string, date: Date){
        const newDateFormat = [('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2), date.getFullYear()].join("/");
        const foundStock = StockNames[stockName].find(stock => stock.Date === newDateFormat);
        return foundStock ? foundStock : {error: "Stock doesn't exist"};
    }

    getData(stocks: Stock[], date: Date){
        const dataToSend = {
            date: date,
            datasets: []
        }
        //const stocksValue = stocks.
        //const stock_arr = stocks;
        stocks.forEach(stock => {
            const stockObj = {
                title: stock.title,
                company_name: stock.company_name,
                exchange_rate: this.getCertainData(stock.title, date)
            }
            dataToSend.datasets.push(stockObj);
        })

        return dataToSend;
    }
    addCurrentDayStockInfo(stocks: Stock[], date: Date) {

        stocks.forEach(stock => {
            const currentStock = this.allPricesSinceBiddingsStart.find(obj => obj.stockName === stock.title);


            const priceObj = this.getCertainData(stock.title, date);

            const price = Object.prototype.hasOwnProperty.call(priceObj, 'error') ? 0 : +priceObj.Open.slice(1, priceObj.Open.length);

            currentStock.datasets.push({
                date: String(date),
                price: price
            });

        });
    }


    @SubscribeMessage('start-biddings')
    startBiddings(
        @MessageBody('selectedStocks') selectedStocks: Stock[],
        @MessageBody('date') date: string,
        @MessageBody('speed') speed: number
    ) {
        this.isBiddingGoing = true;

        this.allPricesSinceBiddingsStart = selectedStocks.map(stock => {
            return {
                stockName: stock.title,
                datasets: []
            }
        })
        //console.log("date in startBidding", date); //delete
        let currentDate = new Date(date);

        let dataToSend = this.getData(selectedStocks, currentDate);
        this.addCurrentDayStockInfo(selectedStocks, currentDate);
        let i = 1;

        this.sendData(this.server, dataToSend);
        this.sendStocksHistoryData(this.server, this.allPricesSinceBiddingsStart);
        currentDate.setDate(currentDate.getDate() + 1);
        this.addCurrentDayStockInfo(selectedStocks, currentDate);

        let previousDataset = dataToSend.datasets
        dataToSend = this.getData(selectedStocks, currentDate);

        if (!dataToSend.datasets)
            dataToSend.datasets = previousDataset

        //console.log(selectedStocks)
        const myLoop = () => {

            setTimeout(() => {
                i++;
                console.log("aaa")
                console.log(dataToSend.datasets[0].exchange_rate.Open)

                this.sendData(this.server, dataToSend);
                this.sendStocksHistoryData(this.server, this.allPricesSinceBiddingsStart);
                currentDate.setDate(currentDate.getDate() + 1);
                this.addCurrentDayStockInfo(selectedStocks, currentDate);

                let previousDataset = dataToSend.datasets
                dataToSend = this.getData(selectedStocks, currentDate);

                if (!dataToSend.datasets)
                    dataToSend.datasets = previousDataset


                if (this.isBiddingGoing) {
                    myLoop();
                }
            }, speed * 1000)
        }

        myLoop();
    }

    @SubscribeMessage('end-biddings')
    endBiddings() {
        this.isBiddingGoing = false;
        console.log("biddings end!")
    }

    @SubscribeMessage('change-broker')
    changeBroker(@MessageBody('broker') broker: any) {
        let currentBrokerIndex = this.brokersState.map((br) => br.name).indexOf(broker.name);

        if(currentBrokerIndex === -1) {
            this.brokersState.push(broker);
        } else {
            this.brokersState.splice(currentBrokerIndex, 1, broker);
        }
        this.server.emit('receive-brokers-data', this.brokersState);

    }
}