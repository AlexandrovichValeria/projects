<script lang="ts" setup>

import {ref} from "vue";
import MenuComponent from './MenuComponent.vue'
import BrokerDashboard from './BrokerDashboard.vue'

const cur_broker = ref(JSON.parse(localStorage.getItem('currentBroker') as string));
const cur_date = ref("");

const setDate = (newDate: Date) => {
  if(newDate) {
    const date = new Date(newDate);
    cur_date.value =  [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join("/");
  }
}

const addMoney = (money: number) => {
  cur_broker.value.money_amount += money;
  //console.log("money", money)
  //console.log("addMoney", cur_broker.value.money_amount)
  localStorage.setItem('currentBroker', JSON.stringify(cur_broker.value));
}

const substractMoney = (money: number) => {
  addMoney(-money);
}

</script>

<template>
  <MenuComponent/>
  <section class = "broker_page">
    <p>Страница брокера: {{cur_broker.name}}</p>
    <p>Текущая дата: {{cur_date}}</p>
    <p>Денежные средства: {{cur_broker.money_amount.toFixed(2)}}</p>
    <BrokerDashboard
        @add-money="addMoney"
        @substract-money="substractMoney"
        @update-date="setDate"
    />
  </section>
</template>

<style>
.broker_page{
  background: #880c31;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 50px;
  font-family: Verdana;
  color: #F8FAC8;
  font-size: 20px;
  border-radius: 10px;
  padding: 15px 30px;
}
</style>