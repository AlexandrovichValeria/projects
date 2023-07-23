
<script lang="ts" setup>
import MenuComponent from "../MenuComponent.vue"
import {onMounted, onUnmounted, ref} from "vue";
import {IBrokerStocks} from "@/interfaces/IBrokerStocks";
import socketService from '@/services/socket.service';
import router from "@/router";
import axios from "axios";
import {IBroker} from "@/interfaces/IBroker";
import AdminMenuComponent from "@/views/admin/AdminMenuComponent.vue";

//const broker_list = ref<IBroker[]>([])

const socket = socketService.setupSocketConnection();
//const broker = JSON.parse(localStorage.getItem('currentBroker') as string);
//console.log(broker)

const full_broker_info = ref<IBrokerStocks[]>([]);

//onMounted(() => {
//});

onUnmounted(() => {
  socketService.disconnect();
})

socket.on('receive-brokers-data', (data) => {
  full_broker_info.value = data;
});

</script>

<template>
  <MenuComponent/>
  <section class="broker_list">
    <div>
      <p class = "list_text">Список брокеров</p>
      <div class="broker_list_element" v-for="cur_broker of full_broker_info" :key="cur_broker.name">
        <p>Имя: {{cur_broker.name}}</p>
        <p>Денежные средства: {{cur_broker.money_amount.toFixed(2)}}</p>
        <p>Баланс: {{cur_broker.balance.toFixed(2)}}</p>
        <div class="table-row" v-for="stock of cur_broker.stocksInfo" :key="stock.stockName">
          <div>Название акции: {{stock.stockName}}</div>
          <div>Куплено шт.: {{stock.amount}}</div>
          <div>Текущий курс: {{stock.price}}</div>
          <div :class="stock.incomeState">Прибыль: {{stock.income}}$</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.broker_list_element{
  background: #880c31;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 40px;
  font-family: Verdana;
  color: #F8FAC8;
  font-size: 20px;
  border-radius: 10px;
  padding: 15px 30px;
}
.list_text{
  font-family: Verdana;
  color: #F8FAC8;
  font-size: 25px;
  margin-top: 50px;
  text-align: center;
  background: teal;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 10px;
  padding: 15px 30px;
}
.table-row{
  background: teal;
  padding: 15px 30px;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>