import React, {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef, ruRU} from '@mui/x-data-grid';
import {useParams} from "react-router-dom";
import './StockHistory.css'

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale,
    ChartData, LinearScale, Title, Tooltip, Legend, PointElement,
    LineElement, Chart,
} from 'chart.js';
import Menu from "../Menu/Menu";
//import {StockHistoryColumn} from "../StockHistoryColumn/StockHistoryColumn";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function StockHistoryColumn(): GridColDef[] {
    return [
        {
            field: 'date',
            headerName: 'Дата',
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params) => params.row.Date
        },
        {
            field: 'price',
            headerName: 'Цена',
            disableColumnMenu: true,
            sortable: false,
            flex: 1,
            renderCell: (params) => params.row.Open

        },
    ];
}

const StockHistory = () => {
    const { stockName } = useParams() as unknown as { stockName: string };
    let titles: string[];
    let stockData: number[];

    const [chartData, setChartData] = useState<ChartData<"line">>();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4200/stocks/${stockName}`).then((res) => {

            titles = res.data.map((stockInfo: any) => stockInfo.Date)
            titles = titles.reverse()
            stockData = res.data.map((stockInfo: any) => {
                const price = stockInfo.Open.slice(1, stockInfo.Open.length);
                return +(price);
            })
            stockData = stockData.reverse();

            const tempChartData: ChartData<"line"> = {
                labels: titles,
                datasets: [
                    {
                        label: stockName,
                        data: stockData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 0,
                    }
                ]
            }
            setChartData(tempChartData);
            setData(res.data);
            //console.log("data")
            //console.log(data)

        })
    }, []);


    /*<div>
        <canvas id="chartJSContainer" width="600" height="400"></canvas>
    </div>*/

    //
    //console.log(data)
    let history_rows = [];
    let i = 0
    for (let item of data){
        let values = Object.keys(item).map(key => item[key])
        console.log(values[3])

        //console.log(Object.keys(item))
        history_rows.push(<tr key = {i}><th>{values[0]}</th><th>{values[3]}</th></tr>)
        i = i+1;
    }

    //console.log(history_rows)
    //for (let name of Object.keys(datasets1))
    //{
      //  history_rows.push(<><p>{name}</p><p>{datasets1[name][datasets1[name].length-1]}</p></>)
    //}

    /*<div className="table-data">
        <DataGrid
            className="table"
            columns={StockHistoryColumn()}
            rows={data}
            getRowId={(row) => row.Date}
            localeText={
                ruRU.components.MuiDataGrid.defaultProps.localeText
            }
        />
    </div>*/

    return (
        <>
            <Menu />
            <section className="StockHistory">
                <div className="container">
                    <p className = "stock_name">{stockName}</p>

                    <div className="chart-data">
                        {
                            chartData ? <Line data={chartData} /> : null
                        }
                    </div>
                    <div className = "table_div">
                        <table className = "history_table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Курс</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history_rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default StockHistory;