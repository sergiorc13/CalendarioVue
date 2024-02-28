<script setup lang="ts">
import calendarioMes from './components/calendarioMes.vue';
import { ref } from 'vue'
const mes = ref(1)
const anio = ref(2024)
</script>
<template>
    <div class="elegir">
      <label for="mes"> Mes: </label>
        <input type="number" v-model="mes" min="1" max="12"/>
      <label for="anio"> Año: </label>
        <input type="number" v-model="anio" min="2000" max="2050"/>
    </div><br><br>
    <calendarioMes :mes="mes" :anio="anio" />
</template>

<style>
  .elegir{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
