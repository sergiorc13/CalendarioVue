<script setup lang="ts">
import { defineProps, ref } from 'vue'
import axios from 'axios';
const emit = defineEmits(["cerrar-modal-mod", "actualizarTareas"])

interface Props {
  valor?: string;
  showModalMod:boolean
  fecha: string
  id: number
}

const tareaN = ref("")

const modificarTarea = async(tareaNueva: string, fecha:string, idModificar:number)=>{
  const nuevaTarea = {
    id: idModificar,
    fecha: fecha,
    tarea: tareaNueva,
  }
  try{
    const respuesta = await axios.put(`http://localhost:3000/tareas/${idModificar}`, nuevaTarea)
    if(respuesta){
      console.log("Se modificó correctamente la tarea")
      emit("cerrar-modal-mod")
      emit("actualizarTareas")
    }else{
      console.log("No se borró correctamente")
    }
  }catch(error){
    console.error("Error al modificar la tarea", error)
  }
}

const props = defineProps<Props>();

const cerrarModalMod = () => {
    emit('cerrar-modal-mod');
}
  
const cerrarModalEmitted = () => {
  cerrarModalMod();
}
</script>


<template>
    <div class="modal-overlay" v-show="showModalMod">
    <div class="modal-container">
    <div class="modal-header">
      <span class="modal-close" @click="cerrarModalMod">Cerrar</span>
    </div>

    <div class="modal-content">
        <h3 class="fecha">{{ props.fecha }}</h3>
        <p class="fecha">Tarea: {{ props.valor }}</p>
        <input v-model="tareaN" type="text" class="form-control" placeholder="Modificar la tarea">
      <button @click="modificarTarea(tareaN, props.fecha, props.id)">Editar Tarea</button>
      <button @click="cerrarModalEmitted">Volver</button>
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
    padding: 16px;
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

.fecha {
  font-size: 18px;
  font-weight: bold;
}
</style>