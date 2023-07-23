<script lang="ts" setup>
import {computed, ref, toRefs} from "vue";

const emit = defineEmits(['buy-stock']);

const props = defineProps({
  broker: Object,
  currentPrice: Number,
  stockName: String
})

const { broker, currentPrice, stockName } = toRefs(props)
const amountToBuy = ref<number>(1);

const isEnoughMoney = computed(() => {

  if(!currentPrice!.value) {
    return false;
  }

  return broker!.value?.money_amount >= amountToBuy.value * currentPrice!.value;
})

const isFormCorrect = computed(() => {
  return Number.isInteger(amountToBuy.value)
});

const onBuyStock = () => {

  if(!currentPrice?.value) {
    console.log("!currentPrice?.value")
    return ;
  }
  //console.log("amountToBuy.value", amountToBuy.value)
  emit('buy-stock', {
    price: currentPrice.value,
    amount: amountToBuy.value,
    bought_at: "11/12/2022", //delete
    stockName: stockName?.value
  });

  amountToBuy.value = 1;
}
//const isAbleToSellAndBuy = computed(() => currentPrice?.value !== -1);

</script>

<template>
  <div class="buyStockFormSection">
    <input type="number" class="buy-stock" v-model="amountToBuy" id="buy"/>
    <button class = "buy_btn" :disabled="!isFormCorrect || !isEnoughMoney" @click="onBuyStock">Купить</button>
  </div>
</template>