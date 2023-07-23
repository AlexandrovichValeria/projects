import {Stocks} from "../../interfaces/Stocks";
import {NavLink} from "react-router-dom";
import {useSelector} from 'react-redux';
import { useStoreDispatch } from '../../hooks/storeDispatch';
import {getSelectedStocks} from "../../store/SelectedStocks";
import {useCallback, useRef} from "react";
import './Stockelement.css'
import { addSelectedStock, removeSelectedStock} from '../../store/SelectedStocks'

const StockElement = ({stock}: {stock: Stocks}) => {
    const selectedStocks: Stocks[] = useSelector(getSelectedStocks);
    const ref = useRef<HTMLInputElement>(null);


    const dispatch = useStoreDispatch();

    const addStock = useCallback((stock: Stocks) => {
        console.log("ok")
        dispatch(addSelectedStock(stock))
    }, []);

    const removeStock = useCallback((stock: Stocks) => {
        dispatch(removeSelectedStock(stock));
    }, []);

    const onChangeStock = () => {
        if(ref.current?.checked) {
            addStock(stock);
        } else {
            removeStock(stock);
        }
    }

    return (
        <div className="stock_element">
            <div className="Stock__checkbox">
                <input className = "check_box" type="checkbox" ref={ref} onChange={onChangeStock}/>
            </div>

            <p>Название: {stock.title}</p>
            <p>Компания: {stock.company_name}</p>
            <NavLink to={`${stock.title}`} className="history_btn">
                История курса
            </NavLink>
        </div>
    )
}
export default StockElement;