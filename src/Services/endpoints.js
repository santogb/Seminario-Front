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

    //socios endpoints
    crearSocio:`${urlApi}/api/socios/crear`,
    obtenerSocio:`${urlApi}/api/socios/obtener`,
    obtenerSocioPorDni:`${urlApi}/api/socios/obtenerPorDni`,
    editarSocio:`${urlApi}/api/socios/editar`,
    eliminarSocio:`${urlApi}/api/socios/eliminar`,
    listarSocios:`${urlApi}/api/socios/listar`,

    //ingresos endpoints
    crearIngreso:`${urlApi}/api/ingresos/crear`,
    listarIngresos:`${urlApi}/api/ingresos/listar`,
    listarIngresosPorEmpleado:`${urlApi}/api/ingresos/listarPorEmpleado`,
    listarIngresosPorSocio:`${urlApi}/api/ingresos/listarPorSocio`,

    //abonos endpoints
    crearAbono:`${urlApi}/api/abonos/crear`,
    listarAbonos:`${urlApi}/api/abonos/obtener`,
    editarAbono:`${urlApi}/api/abonos/editar`,
    eliminarAbono:`${urlApi}/api/abonos/eliminar`,

    //facturacion endpoints
    crearFacturacion:`${urlApi}/api/facturaciones/crear`,
    listarFacturaciones:`${urlApi}/api/facturaciones/listar`,
    editarFacturacion:`${urlApi}/api/facturaciones/editar`,
    eliminarFacturacion:`${urlApi}/api/facturaciones/eliminar`,

    //Liquidacion endpoints
    crearLiquidacion:`${urlApi}/api/liquidaciones/crear`,
    liquidarEmpleados:`${urlApi}/api/liquidaciones/liquidarEmpleados`,
    listarLiquidaciones:`${urlApi}/api/liquidaciones/listar`,
    eliminarLiquidacion:`${urlApi}/api/liquidaciones/eliminar`,

    //servicios endpoints
    crearServicio:`${urlApi}/api/servicios/crear`,
    listarServicios:`${urlApi}/api/servicios/listar`,
    listarServiciosPorSemana:`${urlApi}/api/servicios/listarPorSemana`,
    editarServicio:`${urlApi}/api/servicios/editar`,
    eliminarServicio:`${urlApi}/api/servicios/eliminar`,

    //datosEmpresa endpoints
    listarDatosEmpresa:`${urlApi}/api/datosEmpresa/listar`,
    editarDatosEmpresa:`${urlApi}/api/datosEmpresa/editar`,

    //TiposAbono
    listarTiposAbono:`${urlApi}/api/tiposAbono/listar`,
    crearTipoAbono:`${urlApi}/api/tiposAbono/crear`,
    listarTiposAbonos:`${urlApi}/api/tiposAbono/obtener`,
    editarTipoAbono:`${urlApi}/api/tiposAbono/editar`,
    eliminarTipoAbono:`${urlApi}/api/tiposAbono/eliminar`,

    //TiposEmpleado
    listarTiposEmpleado:`${urlApi}/api/tiposEmpleado/listar`,

    //TiposPago
    listarTiposPago:`${urlApi}/api/tiposPago/listar`,

    //TiposServicio
    listarTiposServicio:`${urlApi}/api/tiposServicio/listar`,

    //EstadosPago
    listarEstadosPago:`${urlApi}/api/estadosPago/listar`,

    //Integración con Tarjeta
    crearConsumoTarjetaAuthentication:`${urlTarjetaB}/api/Authentication/Token`,
    crearConsumoTarjeta:`${urlTarjetaB}/api/Consumos`,
}

export default endpoints;