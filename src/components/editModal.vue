<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  selectedDate?: string; // Prop para la fecha seleccionada
  idEvento: number;
  currentEventName: string; // Nombre actual del evento
}

const props = defineProps<Props>();

const editedEventName = ref( props.currentEventName );

// Método para editar el evento
const editEvent = async () => {
  try {
    const response = await fetch(`http://localhost:3000/events/${props.idEvento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editedEventName.value }),
    });

    if (response.ok) {
      console.log('Evento editado correctamente.');
      location.reload();
    } else {
        console.log('response:', response);
        console.error('Error al editar el evento.');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }

  // Cerrar el modal después de editar el evento, independientemente del resultado
  props.closeModal();
};
</script>

<template>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-content">
        <h2>Editar Evento</h2>
        <form @submit.prevent="editEvent">
          <div class="form-group">
            <label for="eventName">Nuevo Nombre del Evento:</label>
            <input type="text" id="eventName" v-model="editedEventName" required>
            <h1>{{ props.idEvento }}</h1>
          </div>
          <!-- Muestra la fecha seleccionada -->
          <p>Fecha seleccionada: {{ props.selectedDate }}</p>
          <div class="form-group">
            <button type="submit">Guardar Cambios</button>
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
  


  