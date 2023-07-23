import {IStock} from "./IStock"

export interface IBrokerStocks {
    name: string,
    money_amount: number,
    balance: number,
    stocksInfo: IStock[]
}