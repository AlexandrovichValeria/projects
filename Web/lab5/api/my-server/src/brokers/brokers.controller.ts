import { Broker } from './brokers.model';
import {Body, Controller, Get, Post} from "@nestjs/common";
import {BrokersService} from "./brokers.service";

@Controller('brokers')
export class BrokersController {

    constructor(private readonly brokersService: BrokersService) {

    }
    @Get()
    getBrokerList() {
        return this.brokersService.getBrokerList();
    }
    @Post()
    addBroker(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('money_amount') money: number

    ) {
        console.log("add")
        return this.brokersService.addBroker(id, name, money);
    }
    @Post('delete')
    deleteBroker(
        @Body('id') id: string
    ) {
        console.log("delete");
        return this.brokersService.deleteBroker(id);
    }
    @Post('edit')
    editBroker(
        @Body('broker') broker: Broker
    ) {
        //console.log(broker)
        return this.brokersService.editBroker(broker);
    }

}