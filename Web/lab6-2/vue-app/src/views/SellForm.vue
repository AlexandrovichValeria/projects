<script lang="ts" setup>
import {computed, ref, toRefs} from "vue";

const props = defineProps({
  broker: Object,
  currentPrice: Number,
  amount: Number,
  stockName: String
})

const { stockName, currentPrice, amount } = toRefs(props)
const amountToSell = ref<number>(0);

const emit = defineEmits(['sell-stock']);

const isEnoughStocks = computed(() => {

  if(!amount) return false;

  return amountToSell.value <= (amount!.value as number);
})

const isFormCorrect = computed(() => {
  return Number.isInteger(amountToSell.value)
});

const onSellStock = () => {
  emit('sell-stock', {
    price: currentPrice?.value,
    amount: amountToSell.value,
    bought_at: "11/12/2022",
    stockName: stockName!.value
  });

  amountToSell.value = 0;
}

</script>

<template>
  <div class="sellStockFormSection">
    <input type="number" v-model="amountToSell" />
    <button :disabled="!isFormCorrect || !isEnoughStocks" @click="onSellStock">
      Продать
    </button>
  </div>
</template>