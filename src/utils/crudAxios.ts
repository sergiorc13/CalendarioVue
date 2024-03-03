import axios from 'axios'
export const BASEURL = 'http://localhost:3000'

//Función que modificará un dato de la tabla que le pasemos
export const modificaDato = async (tabla: string, id: number, dato: object) => {
  try {
    await axios.put(`${BASEURL}/${tabla}/${id}`, dato)
  } catch (e) {
    console.log(e)
  }
}


//Función que obtendrá un dato de la tabla que le pasemos
export const obtenerDatos = async (tabla: string) => {
  try {    
    const response = await axios.get(`${BASEURL}/${tabla}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


//Función que eliminará un dato a la tabla que le pasemos
export const eliminaDato = async (tabla: string, id: string) => {
  try {
    await axios.delete(`${BASEURL}/${tabla}/${id}`)
  } catch (e) {
    console.log(e)
  }
}


