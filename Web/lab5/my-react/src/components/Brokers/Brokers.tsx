import { Broker } from '../../interfaces/Broker';
import {render} from "react-dom";
import './Brokers.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import BrokerElement from "../BrokerElement/BrokerElement";
import Menu from "../Menu/Menu";

const Brokers = () => {
    const [broker_list, setBrokers] = useState<Broker[]>([]);
    const name_input = useRef<HTMLInputElement>(null);
    const money_input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        axios.get('http://localhost:4200/brokers').then(res => {
            setBrokers(res.data);
        })
    }, []);

    const onDeleteBroker = (id: string) => {
        setBrokers(prev => prev.filter(broker => broker.id !== id))
    }

    const onAddBroker = () => {
        const name = name_input.current?.value as string;
        const money_amount = +(money_input.current?.value ? money_input.current?.value : 0);
        if(name && money_amount) {
            //const id = `broker=${Math.max(...broker_list.map(broker => +broker.id))}`;
            const id = `broker=${Math.random()}`;
            axios.post('http://localhost:4200/brokers', {id, name, money_amount})
            setBrokers(prev => [...prev, {id: id, name: name, money_amount: money_amount} as Broker])
            //clearForm();
        }
    }
        return (
            <>
                <Menu />
                <section className = "brokers">
                    <div className = "broker_list">
                        {
                            //broker_list.map(broker => <BrokerElement broker={broker} key = {Math.max(...broker_list.map(o => +o.id))}/>)
                            broker_list.map(broker => <BrokerElement broker={broker} onDelete={onDeleteBroker} key = {Math.random()}/>)
                        }
                    </div>

                    <div className = "new_broker">
                        <p>Добавить брокера</p>
                        <input type="text" className="broker_name" name="broker_name" id="broker_name" ref={name_input} />
                        <label className = "change_money_label" htmlFor="money">Денежные средства</label>
                        <input type="number" className="broker_money" name="broker_money" id="broker_money" ref={money_input} />
                        <button className = "new_broker_btn" onClick={onAddBroker}>Ок</button>
                    </div>
                </section>
            </>
        )
}

export default Brokers;
