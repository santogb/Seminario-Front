const urlApi = process.env.REACT_APP_BACKEND_APP_URL || "http://localhost:8000"; 
const urlTarjetaB = process.env.REACT_APP_BACKEND_APP_URL_TARJETAB || "https://cors-anywhere.herokuapp.com/http://52.146.29.128";


const endpoints = {
   //empleados endpoints
    login:`${urlApi}/api/empleados/login`,
    crearEmpleado:`${urlApi}/api/empleados/crear`,
    obtenerEmpleado:`${urlApi}/api/empleados/obtener`,
    obtenerEmpleadoPorDni:`${urlApi}/api/empleados/obtenerPorDni`,
    editarEmpleado:`${urlApi}/api/empleados/editar`,
    eliminarEmpleado:`${urlApi}/api/empleados/eliminar`,
    listarEmpleados:`${urlApi}/api/empleados/listar`,

    //consumo manuales
    listarConsumosManuales:`${urlApi}/api/ConsumosManuales/listar`,
    obtenerConsumoManual:`${urlApi}/api/ConsumosManuales/obtener`,
    eliminarConsumoManual:`${urlApi}/api/ConsumosManuales/eliminar`,
    editarConsumoManual:`${urlApi}/api/ConsumosManuales/editar`,
    crearConsumo:`${urlApi}/api/ConsumosManuales/crear`,
}

export default endpoints;