import React from 'react';
import {NavLink} from "react-router-dom";
import './Menu.css';

const Menu = () => {
    return(
        <menu className="Links">
            <div className="container">
                <NavLink className='link' to='/brokers'>Список брокеров</NavLink>
                <NavLink className='link'  to='/stock_list'>Список акций</NavLink>
                <NavLink className='link'  to='/market_settings'>Настройка биржи</NavLink>
            </div>
        </menu>
    )
}

export default Menu;