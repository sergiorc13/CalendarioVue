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

// Ir al mes y año actual
const irHoy = () => {
  mes.value = new Date().getMonth() + 1
  anio.value = new Date().getFullYear()
}
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
  <h2>{{ nombreMes }} del {{ anio }}</h2>
  <div class="hoy">
    <button @click="irHoy">Ir al mes actual</button>
  </div><br>
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

  .hoy {
    margin-top: 10px; 
    text-align: center;
  }
  .hoy button {
  background-color: #0056b3;
  font-size: 20px;
  text-align: center;
  color: #fff;
  border: none;
  padding: 5px 7.5px;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 8px;
}

button:hover {
  background-color: #003a77;
}

</style>