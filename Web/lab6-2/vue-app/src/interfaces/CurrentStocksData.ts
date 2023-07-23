interface IStockData {
    title: string,
    company_name: string
    exchange_rate: any,
}

export default interface CurrentStocksData {
    date: string,
    datasets: IStockData[]
}