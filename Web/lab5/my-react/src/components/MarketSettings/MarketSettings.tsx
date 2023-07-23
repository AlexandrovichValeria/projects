import React, {useCallback, useEffect, useRef, useState} from "react";
import {Socket} from 'socket.io-client';
import {Line} from "react-chartjs-2";
import {Bidding} from "../../interfaces/Bidding";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import { useSelector } from 'react-redux';

import './MarketSettings.css'

import {
    Chart as ChartJS,
    ChartData,
    Legend, LinearScale, Title, Tooltip,
    PointElement,
    LineElement,
    CategoryScale,
} from 'chart.js';
import {getSelectedStocks, removeSelectedStock, setSelectedStock} from "../../store/SelectedStocks";
import {Stocks} from "../../interfaces/Stocks";
import {useStoreDispatch} from "../../hooks/storeDispatch";
import Menu from "../Menu/Menu";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
let datasets1: any = {};
let labels: string[] = [];


const MarketSettings = ({socket} : {socket: Socket}) => {

    const [chartData, setChartData] = useState<ChartData<"line">>();

    const [data, setData] =  useState<{datasets: Bidding[], date: Date}>({datasets: [], date: new Date()});
    const dateInput = useRef<HTMLInputElement>(null);
    const speedInput = useRef<HTMLInputElement>(null);
    //const chartRef = React.createRef();


    const [isBiddingsGoing, setBiddingsGoing] = useState(false);
    const [lookAtBiddings, setLookAtBiddings] = useState(false);

    const newDate = new Date(data.date);

    let selectedStocks = useSelector(getSelectedStocks);

    const dispatch = useStoreDispatch();

    const setStockToNone = useCallback(() => {
        dispatch(setSelectedStock([]));
    }, []);


    const onBiddingsStart = () => {
        const date: string = dateInput.current!.value;
        const speed: number = +(speedInput.current!.value);
        socket.emit('start-biddings', { selectedStocks: selectedStocks, date, speed});

        setBiddingsGoing(true);

    }
    const onBiddingsEnd = () => {
        setStockToNone()
        selectedStocks = []
        socket.emit('end-biddings');
        setBiddingsGoing(false);
    }

    const lookBidding = () =>{
        setLookAtBiddings(true)
    }

    function StockMarketColumn(): GridColDef[] {

        return [
            {
                field: 'stockName',
                headerName: 'Название акции',
                flex: 1,
                disableColumnMenu: true,
                renderCell: (params) => params.row.name
            },
            {
                field: 'company',
                headerName: 'Компания',
                flex: 1,
                disableColumnMenu: true,
                renderCell: (params) => params.row.company
            },
            {
                field: 'price',
                headerName: 'Цена',
                disableColumnMenu: true,
                sortable: false,
                flex: 1,
                renderCell: (params) => {
                    if (params.row.price.hasOwnProperty("error")) return "No info for this day";

                    return params.row.price.Open;
                }

            },
        ];
    }

    let prev_prices = new Map<string, number>();
    let stock_colors = new Map<string, string>([
        ["AAPL", '#e6992d'],
        ["AMD", '#000000'],
        ["AMZN", '#af0000'],
        ["CSCO", '#926472'],
        ["MSFT", '#dac789'],
        ["QCOM", '#71dac2'],
        ["SBUX", '#ef4a73'],
        ["TSLA", '#7a9f8e']
        ]);

    useEffect(() => {
        labels = []
        datasets1 = []
        //let prev_price = 0


        socket.on('receive-stocks-info', (dataToSend) => {
            const date1 = new Date(dataToSend.date);
            labels.push(`${date1.getDate()}/${date1.getMonth()}/${date1.getFullYear()}`);

            dataToSend.datasets.forEach((item: any) => {

                let price = 0;
                if (!item.exchange_rate.hasOwnProperty('error')) {
                    price = +item.exchange_rate.Open.slice(1, item.exchange_rate.Open.length)
                    prev_prices.set(item.title, price)
                }

                else { // @ts-ignore
                    if ((prev_prices.get(item.title) !== undefined && prev_prices.get(item.title) !== 0))
                        { // @ts-ignore
                            price = prev_prices.get(item.title)

                            //console.log("prev")
                        }
                    else price = 0
                    //const price = !item.exchange_rate.hasOwnProperty('error') ? +item.exchange_rate.Open.slice(1, item.exchange_rate.Open.length) : 0;
                }

                if(datasets1.hasOwnProperty(item.title)) {
                    datasets1[item.title].push(price);
                } else {
                    datasets1[item.title] = [price];
                }
            });

            const tempChartData: ChartData<"line"> = {
                labels,
                datasets: Object.keys(datasets1).map((item) => {
                    return {
                        label: item,
                        data: datasets1[item],
                        borderColor: stock_colors.get(item),
                        backgroundColor: stock_colors.get(item)
                    }
                })
            }
            setData(dataToSend);
            setChartData(tempChartData);
        })
        return () => {
            socket.off('receive-stocks-info');
        }
    }, [socket])
//datasets1.map((stock: any) => <div><p>Название акции: </p><p>{stock.title}</p></div>)
        //datasets1.map((stock: any) => <div><p>Название акции: </p><p>{stock.title}</p></div>)

    const stocks_rows = [];
    for (let name of Object.keys(datasets1))
    {
        stocks_rows.push(<><p>{name}: {datasets1[name][datasets1[name].length-1]}</p></>)
    }
    return(
        <>
            <Menu />
            <section className = "market_settings">
                <div className="container">
                    {
                        isBiddingsGoing || lookAtBiddings ?
                            <div className="StockMarketTable-section">
                                <section className="StockMarketTable">
                                    <h2>{`${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`}</h2>

                                </section>
                                <div className = "biddings_data">
                                {
                                    chartData ? <Line data={chartData} /> : null
                                }
                                </div>
                                <div className = "stock_exchange_rate">
                                    {stocks_rows}
                                </div>
                                <button className="endBidding" onClick={onBiddingsEnd}>Закончить торги</button>

                            </div>
                            :
                            <div className="bidding-section">
                                <label htmlFor="name" className = "text_label">Дата начала торгов</label>
                                <input type="date"
                                       ref={dateInput} className="date" name="date" id="date" />
                                <label htmlFor="money" className = "text_label">Шаг в секундах</label>
                                <input type="number"
                                       ref={speedInput} className="number" name="number" id="number" />
                                <button className="startBidding" onClick={onBiddingsStart}>Начать торги</button>
                                <button className="lookBidding" onClick={lookBidding}>Посмотреть на идущие торги</button>
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default MarketSettings;