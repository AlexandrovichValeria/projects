import { Broker } from '../../interfaces/Broker';
import axios from "axios";
import {useRef} from "react";
import './BrokerElement.css'

const BrokerElement = ({broker, onDelete}: {broker: Broker, onDelete: (id: string) => void}) => {
    const onDeleteBroker = () => {
        axios.post('http://localhost:4200/brokers/delete', {id: broker.id});
        onDelete(broker.id);
    }
    const onChangeBroker = () => {
        //console.log("here")
        if (inputRef.current!.value){
            broker.money_amount = +inputRef.current!.value;
            axios.post('http://localhost:4200/brokers/edit', {broker: broker});
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="broker_element">
            <p>Имя: {broker.name}</p>
            <p>Денежная сумма: {broker.money_amount}</p>
            <input type="number" ref={inputRef}
                   className="money_input" defaultValue={broker.money_amount} />
            <div className = "buttons">
                <button className="BrokerItem__save-button"
                    onClick={onChangeBroker}>Сохранить изменения</button>

                <button className="BrokerItem__delete-button" onClick={onDeleteBroker}>Удалить</button>
            </div>
        </div>
        )
}

export default BrokerElement;