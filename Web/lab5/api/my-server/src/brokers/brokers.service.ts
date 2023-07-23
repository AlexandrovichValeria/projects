import {Injectable} from "@nestjs/common";
import {Broker} from "./brokers.model";
import * as brokers from "./../../data/brokerList.json";

@Injectable()
export class BrokersService {
    broker_list: Broker[] = brokers;

    getBrokerList() {
        return [...this.broker_list];
    }

    addBroker(id: string, name: string, money: number) {
        const newBroker = new Broker(id, name, money);
        this.broker_list.push(newBroker);
        return { id: id };
    }
    deleteBroker(brokerId: string) {
        const index = this.broker_list.map(broker => broker.id).indexOf(brokerId);

        //console.log(brokerId)

        //console.log(index);

        this.broker_list.splice(index, 1);

        console.log(this.broker_list)

        return brokerId;
    }
    editBroker(modifiedBroker: Broker) {
        const index = this.broker_list.map(broker => broker.id).indexOf(modifiedBroker.id);

        //console.log(index);
        this.broker_list[index] = modifiedBroker;

        return modifiedBroker.id;
    }
}