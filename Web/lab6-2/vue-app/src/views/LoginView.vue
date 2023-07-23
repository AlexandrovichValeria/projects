<script lang="ts" setup>

import {IBroker} from "@/interfaces/IBroker";

import axios from "axios";
import {onMounted, ref} from "vue";
import router from "@/router";

const broker_list = ref<IBroker[]>([])
const cur_name = ref('');


onMounted(() => {
  if(localStorage.getItem('currentBroker')) {
    const currentBroker = JSON.parse(localStorage.getItem('currentBroker') as string);
    router.push(`${currentBroker.name}/broker_page`);
  } else {
    axios.get('http://localhost:4200/brokers').then((res) => {
      broker_list.value = res.data
      //console.log("aaa")
      console.log(res.data);
    })
  }
})

const login = () => {
  //console.log(cur_name.value)
  let cur_broker = broker_list.value.find((br: IBroker) => br.name === cur_name.value);

  //console.log(broker_list.value)
  if(cur_broker) {
    cur_broker.balance = cur_broker.money_amount;
    localStorage.setItem('currentBroker', JSON.stringify(cur_broker));
    router.push(`${cur_broker.name}/broker_page`);
  }
}
</script>


<template>
  <section class = "login">
    <div class="login_div">
      <p>ВХОД</p>
      <label for="cur_name">Введите имя</label><br>
      <input class = "name_input" type="text" v-model="cur_name"/>
      <button @click="login" id="login_btn">Войти</button>
      <router-link to="/admin" class = "admin_link">Администратор</router-link>
    </div>
  </section>
</template>

<style>
.login_div{
  background: #880c31;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 100px;
  text-align: center;
  font-size: 25px;
  font-family: Verdana;
  color: #f8fac8;
  border-radius: 20px;
  padding: 15px 30px;
}
.name_input{
  margin-top: 30px;
  margin-bottom: 50px;
}

#login_btn{
  color: #f8fac8;
  background: #E6992D;
  padding: 10px;
}

#login_btn:hover{
  background: teal;
}

.admin_link{
  margin: 0;
  text-decoration: underline;
}
</style>