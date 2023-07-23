
import { Stocks } from '../../interfaces/Stocks';
import {useEffect, useState} from "react";
import axios from "axios";
import StockElement from "../StockElement/StockElement";
import './StockList.css'
import Menu from "../Menu/Menu";

const StockList = () => {
    const [stock_list, setStocks] = useState<Stocks[]>([]);

    useEffect(() => {

        axios.get(`http://localhost:4200/stocks`).then((res) => {
            setStocks(res.data);
        })

    }, []);

    return(
        <>
            <Menu />
            <section className = "stocks">
                <div className = "stocks_list">
                    {
                        stock_list.map((stock) => <StockElement stock={stock} key={Math.random()}  />)
                    }
                </div>
            </section>
        </>
    )
}

export default StockList;