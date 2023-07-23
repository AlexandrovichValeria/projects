//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Brokers from './components/Brokers/Brokers';
import {render} from "react-dom";
import Menu from "./components/Menu/Menu";
import StockList from "./components/StockList/StockList";
import MarketSettings from "./components/MarketSettings/MarketSettings";
import { io } from 'socket.io-client';
import {useEffect, useState} from "react";
import StockHistory from "./components/StockHistory/StockHistory";
const socket = io('http://localhost:4200')

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            //console.log("+1")
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

        return (
            <>
                <Routes>
                    <Route path = "/brokers" element={<Brokers/>}></Route>
                    <Route path = "/stock_list" element={<StockList/>}></Route>
                    <Route path = "/stock_list/:stockName" element={<StockHistory/>}></Route>
                    <Route path = "/market_settings" element={<MarketSettings socket={socket} />}></Route>
                </Routes>
            </>
        );
}

export default App;
