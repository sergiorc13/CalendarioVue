<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from './addModal.vue';

interface Props {
  valor?: string;
}

const props = defineProps<Props>();

// Variable para controlar la visibilidad del modal
const showModal = ref(false);

// Lista de eventos obtenidos del servidor JSON
const events = ref([]);

// Método para abrir el modal al pinchar en la celda
const openModalFromCell = () => {
  showModal.value = true;
  console.log("Modal creado correctamente");
};

// Método para cerrar el modal
const closeModal = () => {
  showModal.value = false;
  console.log("Modal cerrado correctamente");
};

// Método para obtener los eventos del servidor JSON
const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:3000/events');
    const data = await response.json();
    events.value = data;
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
  }
};

// Método para filtrar eventos por la fecha actual
const getEventsForCurrentDay = () => {
  return events.value.filter((event: any) => event.date === props.valor) as Array<any>;
};

// Llamar a fetchEvents al montar el componente
onMounted(() => {
  fetchEvents();
});

// Manejar el evento emitido desde el modal cuando se agrega un nuevo evento
const handleEventoAgregado = () => {
  fetchEvents(); // Volver a cargar los eventos después de agregar uno nuevo
};
</script>


<template>
  <div class="cell">

  
  <p>{{ props.valor }}</p>
  <ul>
      <li v-for="event in getEventsForCurrentDay()" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
  <button class="añadir" @click="openModalFromCell">+</button>
  </div>
  <Modal :showModal="showModal" :closeModal="closeModal" :selectedDate="props.valor || ''" />
</template>

<style>
.cell {
  
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  
}

.añadir {
  background-color: #007bff;
  font-size: 15px;
  text-align: center;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 50px;
  cursor: pointer;
}

.añadir:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: rgb(255, 110, 110);
  color: white;
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

