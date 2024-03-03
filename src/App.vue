<script setup lang="ts">
import calendarioMes from './components/calendarioMes.vue'
import { ref, computed } from 'vue'

// Mostrar por defecto el mes y el año actual
const mes = ref(new Date().getMonth() + 1)
const anio = ref(new Date().getFullYear())

// Obtener el nombre del mes
const nombreMes = computed(() => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return meses[mes.value - 1]
})
</script>


<template>
  <div>
    <h2 class="calendario">CalendarioVue</h2>
  </div>
  <div class="elegir">
    <label for="mes"> Mes: </label>
    <input type="number" v-model="mes" min="1" max="12"/> 
    <label for="anio"> Año: </label>
    <input type="number" v-model="anio" min="2000" max="2050"/>
  </div>
  <h2>{{ nombreMes }}</h2>
  
  <calendarioMes :mes="mes" :anio="anio" />
</template>


<style>
 .elegir {
    text-align: center;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .calendario {
    color: rgb(0, 125, 39);
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;    
  }

  h2 {
    color: blue;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;    
  }

  label {
    display: flex;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
  }

  input {
    text-align: center;
    padding: 4px ;
    font-size: 16px;
    border: 1px solid #0025c7;
    border-radius: 4px;
    margin-left: 5px;
    margin-right: 10px;
  }
</style>