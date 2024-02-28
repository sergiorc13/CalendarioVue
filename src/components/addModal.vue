<script setup lang="ts">
import { ref } from 'vue';



interface Props {
  showModal: boolean;
  closeModal: () => void;
}

const { showModal, closeModal } = defineProps<Props>();

const eventName = ref('');

const addEvent = () => {
  // Aquí puedes implementar la lógica para guardar el evento
  // Por ejemplo, puedes emitir un evento con los datos del evento
  const eventData = {
    name: eventName.value,
  };
  console.log("Evento añadido:", eventData);

  // Cerrar el modal después de añadir el evento
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
          <div class="form-group">
            <button type="submit">Añadir Evento</button>
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
  