<script setup lang="ts">
//Creamos la propiedad props que tiene el valor fecha 
interface Props {
  valor?: string;
}

//Creamos la variable que recoge este props creado anteriormente.
const props = defineProps<Props>();
</script>


<template>
  <div class="celda-calendario">
    <p class="fecha">{{ props.valor }}</p>
  </div>
</template>


<style scoped>
.celda-calendario {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.fecha {
  font-size: 18px;
  font-weight: bold;
}
</style>