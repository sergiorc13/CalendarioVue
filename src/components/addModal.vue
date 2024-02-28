<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  selectedDate: string; // Prop para la fecha seleccionada
}

const { showModal, closeModal, selectedDate } = defineProps<Props>();

const eventName = ref('');

const addEvent = async () => {
  try {
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Math.floor(Math.random() * 1000), name: eventName.value, date: selectedDate }),
    });

    if (response.ok) {
      console.log('Evento añadido correctamente.');
      // Llamar a fetchEvents para actualizar la lista de eventos después de agregar uno nuevo
      const fetchEvents = async () => {
        //Mostrar los eventos en el DOM 
        const response = await fetch('http://localhost:3000/events');
        const data = await response.json();
        console.log(data);
      };

      fetchEvents();
    } else {
      console.error('Error al añadir el evento.');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }

  // Cerrar el modal después de añadir el evento, independientemente del resultado
  closeModal();
};
</script>



<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-content">
      <h2>Añadir Evento</h2>
      <form @submit.prevent="addEvent">
        <div class="form-group">
          <label for="eventName">Nombre del Evento:</label>
          <input type="text" id="eventName" v-model="eventName" required>
        </div>
        <!-- Muestra la fecha seleccionada -->
        <p>Fecha seleccionada: {{ selectedDate }}</p>
        <div class="form-group">
          <button type="submit">Guardar</button>
          <button type="button" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>



<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
}

.modal.is-active {
  display: flex;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
