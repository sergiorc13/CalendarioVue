<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import axios from 'axios'
  
const emit = defineEmits(["cerrar-modal", "actualizarTareas"])

interface Props {
valor: string;
showModal:boolean
}

const tareaN = ref("")

const agregar = async(tareaNueva:string, fechaNueva:string)=>{
  try {
    const nuevaTarea = {
      tarea: tareaNueva,
      fecha: fechaNueva
    }
    await axios.post(`http://localhost:3000/tareas`, nuevaTarea);
    console.log("Se ha agregado correctamente")
    tareaN.value = "";
    emit("cerrar-modal")
    emit("actualizarTareas")
  } catch (error) {
    console.error('Error al obtener las tareas', error);
  }
}

const props = defineProps<Props>();
  const cerrarModal = () => {
    emit('cerrar-modal');
}
  
  const cerrarModalEmitted = () => {
    cerrarModal();
}
</script>


<template>
  <div class="modal-overlay" v-show="showModal">
    <div class="modal-container">
      <div class="modal-header">
        <span class="modal-close" @click="cerrarModal">Cerrar</span>
      </div>
      <div class="modal-content">  
        <h2>{{ props.valor }}</h2>
        <input v-model="tareaN" type="text" class="form-control" placeholder="Agregar Tarea">    
        <button @click="agregar(tareaN, props.valor)">Añadir</button>
        <button @click="cerrarModalEmitted">Cancelar</button>   
      </div>    
    </div> 
  </div>
</template>


<style scoped>
  /* Estilos para el modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 200, 251, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}
  
.modal-container {
    background: #ae00ae;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 60%;
    max-width: 600px;
}
  
.modal-header {
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
}

.modal-close {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: white;
}
  
.modal-content {
  padding: 20px;
}

button {
  width: 25%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
  