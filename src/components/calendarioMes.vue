<script setup lang="ts">
import {computed } from 'vue'
import celdaCalendario from '@/components/celdaCalendario.vue'

interface Props{
    mes?:number
    anio?:number
    cols?:string[]
    COLS?:number
    ROWS?:number
}

const props = withDefaults(defineProps<Props>(),{
            cols: ()=> ['Lunes', 'Martes', 'Miércoles', 'Jueves','Viernes','Sábado', 'Domingo'],
            COLS: 7,
            ROWS: 5,
            anio: 2000,
            mes: 1


})


//Convertimos el número de orden del día en filas y columnas
const anadevalorSecuencial = (numero:number, valor:string, celdas:string[][]) =>{
    const fila = Math.floor(numero / props.COLS);
    const columna = numero % props.COLS;
    celdas[fila][columna]=valor 
}



const tablaMes = computed(() =>{
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
                        Array.from(Array(props.ROWS).keys()).map(() => ''))
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6,0,1,2,3,4,5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()] .map(i => i + posicionPrimerDia )
  //Recorremos el rango de números para añadir la fecha
  rangoNumeros.map((el,ind)=> anadevalorSecuencial(el,`${ind +1}/${props.mes}/${props.anio}`, celdas))
  return celdas
})
</script>

<template>
   <table>
    <thead>
      <tr>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in props.ROWS" :key="i">        
        <td v-for="(c, j) in cols" :key="c">
          <celdaCalendario :valor="tablaMes[i-1][j]"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
body {
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

.margen {
  background-color: white;
}

th {
  background-color: #30449f;
  color: white;
}

tr:first-of-type th {
  width: 25px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
</style>