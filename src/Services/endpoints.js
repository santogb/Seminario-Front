const urlApi = process.env.REACT_APP_BACKEND_APP_URL || "https://seminario-1.herokuapp.com"; 

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
    listarConsumosManuales:`${urlApi}/seminariobackend/obtenerConsumoPorUsuario`,
    obtenerConsumoManual:`${urlApi}/api/ConsumosManuales/obtener`,
    eliminarConsumoManual:`${urlApi}/seminariobackend/eliminarConsumo`,
    editarConsumoManual:`${urlApi}/api/ConsumosManuales/editar`,
    crearConsumo:`${urlApi}/seminariobackend/crearConsumo`,
    crearConsumoOCR:`${urlApi}/seminariobackend/ocrimage2`,


    listarEstimados:`${urlApi}/seminariobackend/obtenerConsumoEstimadoPorUsuario`,
    eliminarEstimado:`${urlApi}/seminariobackend/eliminarConsumoEstimado`,
    obtenerEstimado:`${urlApi}/seminariobackend/obtenerConsumoEstimado`,
    crearEstimado:`${urlApi}/seminariobackend/crearConsumoEstimado`,

    obtenerElectrodomestico:`${urlApi}/seminariobackend/obtenerElectrodomestico`,
}

export default endpoints;