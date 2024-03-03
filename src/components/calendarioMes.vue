<script setup lang="ts">
import { computed, ref, onMounted, defineProps } from 'vue';
import celdaCalendario from '@/components/celdaCalendario.vue';
import modalVue from "@/components/addModal.vue"
import modalModificar from './modificarModal.vue';
import axios from 'axios';
import { obtenerDatos, modificaDato } from "@/utils/crudAxios"

interface Tarea {
  id: number;
  tarea: string;
  fecha: string;
}

interface Props {
  mes?: number;
  anio?: number;
  cols?: string[];
  COLS?: number;
  ROWS?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  COLS: 7,
  ROWS: 5,
  anio: 2000,
  mes: 1
});

const tareas = ref<Tarea[]>([]);
const showModal = ref(false);
const showModalMod = ref(false);

const actualizarDatos = async () => {
  try {
    tareas.value = await obtenerDatos("tareas")
  } catch (error) {
    console.error("Error" + error)
  }
}
const tareaDrag = ref<Tarea>({
  id: -1,
  tarea: "",
  fecha: ""
})

//Evento para poder hacer dragstart
const eventodrag = (tarea: Tarea) => {
  tareaDrag.value = tarea
  console.log("Evento dragstart")
}

const eventoOver = (e: Event) => {
  e.preventDefault()
}

const eventoDrop = async (fechaDrop: string) => {
  console.log("Evento movido")
  tareaDrag.value.fecha = fechaDrop
  await modificaDato("tareas", tareaDrag.value.id, tareaDrag.value)

}

const fechaModalMod = ref<string>("")
const valorMod = ref<string>("")
const idMod = ref<number>(0)
const abrirModalMod = (fecha: string, valor: string, id: number) => {
  showModalMod.value = true;
  fechaModalMod.value = fecha
  valorMod.value = valor
  idMod.value = id
};

const cerrarModalMod = () => {
  showModalMod.value = false;
};


onMounted(async () => {
  actualizarDatos()
});

const borrarTarea = async (idBorrar: number) => {
  try {
    const respuesta = await axios.delete(`http://localhost:3000/tareas/${idBorrar}`);
    if (respuesta) {
      console.log("Borrado correctamente")
    } else {
      console.log("No borrado correctamente")
    }
    actualizarDatos()
  } catch (error) {
    console.error("Error al borrar la tarea", error)
  }
}


const anadevalorSecuencial = (numero: number, valor: string, celdas: string[][]) => {
  const fila = Math.floor(numero / props.COLS);
  const columna = numero % props.COLS;
  celdas[fila][columna] = valor;


};
const fechaModal = ref<string>("")
const abrirModal = (fecha: string) => {
  showModal.value = true;
  fechaModal.value = fecha
};

const cerrarModal = () => {
  showModal.value = false;
};

const tablaMes = computed(() => {
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
    Array.from(Array(props.ROWS + 1).keys()).map(() => ''))
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6, 0, 1, 2, 3, 4, 5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()].map(i => i + posicionPrimerDia)
  //Recorremos el rango de números para añadir la fecha
  rangoNumeros.map((el, ind) => anadevalorSecuencial(el, `${ind + 1}/${props.mes}/${props.anio}`, celdas))
  return celdas
});


</script>


<template>
  <div class="container mt-5">
    <table class="table table-bordered">
      <thead>
        <tr>
            
          <!--Recorremos las filas y columnas.-->
          <th v-for="c in cols" :key="c">{{ c }}</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in props.ROWS" :key="i">
           
          <td v-for="(c, j) in cols" :key="c">
            <div class="position-relative">
              <!--Celda calendario va a recibir el valor de la fecha-->
              <celdaCalendario :valor="tablaMes[i - 1][j]" class="p-3" />
              <!--Hacemos un condicional para no permitir la posibilidad de agregar una tarea a una celda sin fecha.-->
              <div v-if="tablaMes[i - 1][j] != ''">
                <button @dragover="eventoOver" @drop="eventoDrop(tablaMes[i - 1][j])"
                  @click="abrirModal(tablaMes[i - 1][j])" class="botonAgregar">
                  +
                </button>
              </div>
              <modalVue :showModal="showModal" :valor="fechaModal" @cerrar-modal="cerrarModal" @abrir-modal="abrirModal"
                @actualizarTareas="actualizarDatos" />
              <div v-for="tarea in tareas" :key="tarea.id" class="m-2">
                <div :draggable="true" @dragstart="eventodrag(tarea)" v-if="tablaMes[i - 1][j] === tarea.fecha"
                  class="tarea">{{ tarea.tarea }}
                  <button @click="borrarTarea(tarea.id)" class="botonBorrar">Eliminar</button>
                  <button @click="abrirModalMod(tablaMes[i - 1][j], tarea.tarea, tarea.id)" class="botonModificar">Cambiar</button>
                  <modalModificar :showModalMod="showModalMod" :fecha="fechaModalMod" :valor="valorMod" :id="idMod"
                    @cerrar-modal-mod="cerrarModalMod" @actualizarTareas="actualizarDatos" />
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content">

        <span @click="cerrarModal" class="close">&times;</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tarea {
  font-size: 14px;
  margin-bottom: 5px;
}

.botonAgregar {
  background-color: #0056b3;
  font-size: 15px;
  text-align: center;
  color: #fff;
  border: none;
  padding: 5px 7.5px;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 8px;
}

.botonAgregar:hover {
  background-color: #003a77;
}

.botonBorrar {
  width: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #600000;
  color: white;
  cursor: pointer;
  text-align: center;
  margin-right: 5px;
  margin-left: 5px;
}

.botonBorrar:hover {
  background-color: #ee0f0f;
  color: #fff;
}

.botonModificar {
  width: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  text-align: center;
}

.botonModificar:hover {
  background-color: #343eff;
  color: #fff;
}

.modal {
  display: none;
  /* Cambia 'block' a 'none' para ocultar el modal por defecto */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}


body {
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

.margen {
  background-color: white;
}

th {
  background-color: #30449f;
  color: white;
}

tr:first-of-type th {
  width: 25px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #30449f;
  height: 1.5em;
  overflow: hidden;
  text-align: center;
}
</style>./modificarModal.vue
