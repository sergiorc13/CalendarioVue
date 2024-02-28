<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Modal from './addModal.vue';

interface Props {
  valor?: string;
}

const props = defineProps<Props>();

// Variable para controlar la visibilidad del modal
const showModal = ref(false);

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
</script>

<template>
  <div class="cell"  @click="openModalFromCell">
    <p>{{ props.valor }}</p>
    <!-- Aquí sigue el resto de tu código -->
    
    
  </div>
  <Modal :showModal="showModal" :closeModal="closeModal"/>
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
