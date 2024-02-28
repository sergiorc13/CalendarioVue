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
  <div class="cell" @click="openModalFromCell">
    <p>{{ props.valor }}</p>
    <ul>
      <li v-for="event in getEventsForCurrentDay()" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
  </div>
  <Modal :showModal="showModal" :closeModal="closeModal" :selectedDate="props.valor || ''" />
</template>

<style>
.cell,
.cell input {
  height: 2.25em;
  line-height: 2.25;
  font-size: 22.5px;
}

.cell:hover{
  cursor: pointer;

}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}

.modal {
  display: none;
}

.modal.is-active {
  display: flex;
}
</style>
