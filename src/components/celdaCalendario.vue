<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import Modal from './addModal.vue';

interface Props {
  valor?: string;
}

const props = defineProps<Props>();

// Variable para controlar la visibilidad del modal
const showModal = ref(false);

// Variable para almacenar los eventos
const events = ref([]);

// Método para abrir el modal al pinchar en la celda
const openModalFromCell = () => {
  showModal.value = true;
};

// Método para cerrar el modal
const closeModal = () => {
  showModal.value = false;
};

// Método para obtener los eventos del servidor JSON
 const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:3000/events');
    const data = await response.json();
    // Asigna los eventos obtenidos a la variable local events
    events.value = data;
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
  }
};

// Método para filtrar eventos por la fecha actual
const getEventsForCurrentDay = () => {
  return events.value.filter((event: any) => event.date === props.valor) as Array<any>;
};

//Montar el componente automaricamente
onMounted(() => {
  fetchEvents();
});

//Editar el evento
const openModalFromCellEditar = () => {
  showModal.value = true;
};






</script>

<template>
  <div class="cell" v-if="props.valor">
    <h3>{{ props.valor }}</h3>
    <ul>
      <li v-for="event in getEventsForCurrentDay()" :key="event.id">
        {{ event.name}} <br>
        <button @click="openModalFromCell">Editar</button>
      </li>
    </ul>
    <!-- Botón para abrir el modal, pasa props.valor como selectedDate -->
    <button class="añadir" @click="openModalFromCellEditar">+</button>
  </div>
  <!-- Renderiza el modal solo si showModal es true -->
  <Modal v-if="showModal" :showModal="showModal" :closeModal="closeModal" :selectedDate="props.valor || ''" />
</template>


<style>
.cell {
  
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  
}

.añadir {
  background-color: #0056b3;
  font-size: 15px;
  text-align: center;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 50px;
  cursor: pointer;
}

.añadir:hover {
  background-color: #003a77;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: rgb(183, 0, 255);
  padding: 8px;
  color: white;
  font-size: 16px;
}

/* Estilos para el modal (ajustar según necesidades) */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>

