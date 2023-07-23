export class fullStockInfo {
    constructor(public Date: string,
                public Close: {Last: string},
                public Volume: number,
                public Open: string,
                public High: string,
                public Low: String) {
    }
}