<script lang="ts" setup>

import router from "@/router";

const logout = () => {
  localStorage.removeItem('currentBroker');
  router.push('../login');
}
</script>

<template>
  <menu>
    <div class="container">
      <span @click="logout">Выйти</span>
    </div>

  </menu>

</template>

<style>

menu{
  background: #880c31;
  padding: 30px;
  width: 100%;
}
.container {
  width: 90%;
  margin: 0 auto;
}

a, span {
  text-decoration: none;
  color: #f8fac8;
  margin-right: 40px;
  font-size: 25px;
  cursor: pointer;
  font-weight: bold;
  font-family: Verdana;
  font-style: normal;
}
</style>