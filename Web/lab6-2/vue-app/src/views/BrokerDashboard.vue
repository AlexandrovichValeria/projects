<script lang="ts" setup>

import {computed, ref} from "vue";
//import CurrentStocksData from "@/interfaces/CurrentStocksData";
import {IBrokerStock} from "@/interfaces/IBrokerStock";
import { BoughtStock } from '@/interfaces/BoughtStock'
import { SoldStock } from '@/interfaces/SoldStock'
import SocketService from '@/services/socket.service';
import CurrentStocksData from "@/interfaces/CurrentStocksData";
import BuyForm from './BuyForm.vue';
import SellForm from './SellForm.vue'

import {Chart, Grid, Line} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/dist/types';

const emit = defineEmits(['add-money', 'substract-money', 'update-date']);

const isBiddingGoing = ref<boolean>(false);
const cur_broker = JSON.parse(localStorage.getItem('currentBroker') as string);
const currentStocksData = ref<CurrentStocksData>();
const brokerStocks = ref<IBrokerStock[]>([]);
const socket = SocketService.setupSocketConnection();
let prev_prices = new Map<string, number>();
const dialogName = ref("");
const stockData = ref([])
//const allStockData = ref<any>([]);


socket.on('receive-stocks-history', (data: any) => {
  // const currentStockHistory = data.find((stock: any) => stock.stockName === "AAPL");
  // console.log(currentStockHistory.datasets);
  //console.log("data", data)
  if(dialogName.value !== "") {
    let temp = data.find((stock: any) => stock.stockName === dialogName.value).datasets;
    //stockData.value = data.find((stock: any) => stock.stockName === dialogName.value).datasets;
    //console.log("data", temp)
    let prev_price_2 = 0;
    temp.forEach((item: any) => {


          //let price = 0;
          if (item.price !== 0) {
            prev_price_2 = item.price
          } else {
            if (prev_price_2 !== 0) {
              item.price = prev_price_2
            } else item.price = 0
          }
          //item.price = price
      //console.log("item.price", item.price)
        }
    )

    isBiddingGoing.value = true;

    stockData.value = temp;
    //stockData.value = {
      //...data
   // }

    //stockData.value = data.find((stock: any) => stock.stockName === dialogName.value).datasets;
    //console.log("stockData.value", stockData.value)
  } //else{
    //console.log("elsee")
  //}

  //allStockData.value = data;
})

const direction = ref<Direction>('horizontal')
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
})

const axis = ref({
  primary: {
    type: 'band',
    format: (date: string) => {
      const currentDate = new Date(date);
      return [('0' + currentDate.getDate()).slice(-2), ('0' + (currentDate.getMonth() + 1)).slice(-2), currentDate.getFullYear()].join("/");
    }
  },

  secondary: {
    domain: ['dataMin', 'dataMax + 100'],
    type: 'linear',
    ticks: 8
  }
})

socket.on('receive-stocks-info', (dataToSend) => {

  dataToSend.datasets.forEach((item: any) => {
        let price = 0;
        if (!Object.prototype.hasOwnProperty.call(item.exchange_rate, 'error')) {
          price = +item.exchange_rate.Open.slice(1, item.exchange_rate.Open.length)
          prev_prices.set(item.title, price)
        } else {
          if ((prev_prices.get(item.title) !== undefined && prev_prices.get(item.title) !== 0)) {
            price = prev_prices.get(item.title)
          } else price = 0
          //item.exchange_rate.Open = price
          //const price = !item.exchange_rate.hasOwnProperty('error') ? +item.exchange_rate.Open.slice(1, item.exchange_rate.Open.length) : 0;
        }
       item.exchange_rate.Open = "$" + price.toString()
      }
  )

  /*tableData.value?.forEach((stock: any) =>{
    console.log("stock.exchange_rate.Open", stock.exchange_rate.Open)
    console.log("stock.amount", stock.amount)

  })*/

  isBiddingGoing.value = true;

  currentStocksData.value = {
    ...dataToSend
  }

  //console.log("cur_broker.balance", cur_broker.balance)

  //const obj = getBrokerData();

  emit('update-date', currentStocksData.value?.date);
  socket.emit('change-broker', {broker: getBrokerData()});

});

socket.on('biddings-ended', () => {
  setTimeout(() => {
    //currentStocksData.value = undefined;
    currentStocksData.value = undefined;
    isBiddingGoing.value = false;
  }, 1000)
  //currentStocksData.value = undefined;
  //isBiddingGoing.value = false;
});

const tableData = computed(() =>{
  return currentStocksData.value?.datasets.map(stock => {
    const brokerStockData = brokerStocks.value.find(brokerStock => brokerStock.stockName === stock.title);
    if(!brokerStockData) return {
      ...stock,
      amount: 0
    }
    return {
      ...stock,
      amount: brokerStockData.currentAmount
    }
  })
})

const getBrokerData = () => {
  const currentBroker = JSON.parse(localStorage.getItem('currentBroker') as string);
  cur_broker.money_amount = currentBroker.money_amount;
  currentBroker.balance = getBalance();
  cur_broker.balance = getBalance()


  const brokerData = {
    name: currentBroker.name,
    money_amount: currentBroker.money_amount,
    balance: currentBroker.balance,
    stocksInfo: []
  }

  const result = tableData.value!.map((stock) => {
    return {
      stockName: stock.title,
      amount: stock.amount,
      price: getPrice(stock.exchange_rate),
      income: getIncome(stock, stock.amount),
      incomeState: getIncomeState(getIncome(stock, stock.amount))
    }
  });

  brokerData.stocksInfo = result as never;

  return brokerData;
}

const getBalance = () => {
  let result = 0;
  tableData.value?.forEach((stock: any) =>{
    result += getPrice(stock.exchange_rate) * stock.amount;
    //result += getIncome(stock, stock.amount)
    //result += +stock.exchange_rate.Open.slice(1, stock.exchange_rate.Open.length) * stock.amount
  })

  return cur_broker.money_amount + result
}

const getPrice = (stockPriceObject: any): number => {
  return +stockPriceObject.Open.slice(1, stockPriceObject.Open.length);
  //return Object.prototype.hasOwnProperty.call(stockPriceObject, 'error') ? -1 : +stockPriceObject.Open.slice(1, stockPriceObject.Open.length);
}

const getIncome = (stock: any, stockAmount: number) => {

  const brokerStockData = brokerStocks.value.find(brokerStock => {
    return brokerStock.stockName === stock.title
  });

  //console.log("brokerStocks.value", brokerStocks.value)
  if(!brokerStockData!) {
    console.log("1")
    return 0;
  }

  const currentPrice = getPrice(stock.exchange_rate);

  if(currentPrice === -1) {
    console.log("2")
    return 0;
  }

  const income = currentPrice  * stockAmount - brokerStockData.outcome;

  return Math.round(income as number * 100) / 100;
}

const getIncomeState = (income: number): string => {
  if(income === 0) return ""

  return income > 0 ? "positive" : "negative";
}

const onStockBought = (buyingOperationData: BoughtStock) => {
  const { stockName, price, bought_at, amount } = buyingOperationData;

  const brokerStock = brokerStocks.value.find(stock => stock.stockName === stockName);

  if(brokerStock) {
    brokerStock.currentAmount += amount;
    brokerStock.outcome += amount * price;
  } else {
    brokerStocks.value.push({
      stockName: stockName,
      currentAmount: amount,
      outcome: amount * price
    })
  }

  emit('substract-money', price * amount);
}

const onStockSold = (sellingOperationData: SoldStock) => {
  const { stockName, price, sold_at, amount } = sellingOperationData;

  const brokerStock = brokerStocks.value.find(stock => stock.stockName === stockName);

  if(brokerStock) {
    console.log("exist")
    console.log("prices", brokerStock.outcome, (brokerStock.currentAmount - amount));
    brokerStock.outcome = brokerStock.outcome * (brokerStock.currentAmount - amount) / brokerStock.currentAmount;
    brokerStock.currentAmount -= amount;
  }

  emit('add-money', amount * price);
  // socket.emit('change-broker', {broker: getBrokerData()});
  //socket.emit('change-broker', {broker: getBrokerData()});
}

const openDialog = (name: string) => {
  const a = document.getElementById("dialog-history") as HTMLDialogElement;
  dialogName.value = name;

  a.showModal();
}

</script>

<template>
  <div v-if="!isBiddingGoing">Аукцион в данный момент не активен</div>
  <p>Баланс: {{cur_broker.balance.toFixed(2)}}</p>
  <div v-if="isBiddingGoing">
    <div class="stock-element" v-for="stock of tableData" :key="stock.title">
      <p>Название акции: {{stock.title}}</p>
      <p>Текущий курс: {{getPrice(stock.exchange_rate)}}</p>
      <p>Куплено шт.: {{stock.amount}}</p>
      <p class = "income_data">Прибыль: {{getIncome(stock, stock.amount)}}$</p>
      <div class = "buy_div">
        <p>Купить</p>
        <BuyForm
            :broker="cur_broker"
            :currentPrice="getPrice(stock.exchange_rate)"
            :stockName="stock.title"
            @buy-stock="onStockBought"
        /></div>
      <div>
        <p>Продать</p>
        <SellForm
            :broker="cur_broker"
            :currentPrice="getPrice(stock.exchange_rate)"
            :amount="stock.amount"
            :stockName="stock.title"
            @sell-stock="onStockSold"
        />
      </div>

      <div>
        <button class="history_btn" @click="openDialog(stock.title)" :data-name="stock.title">История курса</button>
        <!-- <router-link :to="`/stockHistory/${stock.name}`">История</router-link> -->
      </div>
    </div>
  <dialog close id="dialog-history">
    <Chart
        :size="{ width: 500, height: 420 }"
        :data="stockData"
        :margin="margin"
        :direction="direction"
        :axis="(axis as ChartAxis)">


      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['date', 'price']" />
      </template>
    </Chart>

    <form method="dialog">
      <button class = "close_dialog_btn">Закрыть</button>
    </form>
  </dialog>
  </div>
</template>

<style>
.stock-element{
  background: teal;
  margin: 50px 50px;
  border-radius: 10px;
  padding: 15px 30px;
}
input{
  border: 2px solid #F8FAC8;
  width: 70%;
  font-size: 20px;
  border-radius: 10px;
  padding: 7px;
}

button{
  border: none;
  background: #F8FAC8;
  font-size: 20px;
  border-radius: 10px;
  padding: 7px;
  width: 20%;
  margin-left: 1%;
  color: teal;
}

button:hover{
  background: #880c31;
  color: #F8FAC8;
}

.history_btn{
  margin-left: 0;
  margin-top: 30px;
  width: 70%;
}
</style>