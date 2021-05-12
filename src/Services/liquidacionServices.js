import endpoints from "./endpoints";
import { get, post } from "./endpointServices";

export const crearLiquidacion = async (data) => {
  return await post(endpoints.crearLiquidacion, {
    idTipoPago: data.idTipoPago,
    idEmpleado: data.idEmpleado,
    idEstadoPago: 2,
    anio: data.anio,
    mes: data.mes,
    monto: data.monto,
  });
};

export const liquidarEmpleados = async (data) => {
  return await post(endpoints.liquidarEmpleados, {
    idTipoPago: data.idTipoPago,
    anio: data.anio,
    mes: data.mes,
  });
};

export const listarLiquidaciones = async () => {
  return await get(endpoints.listarLiquidaciones);
};

export const eliminarLiquidacion = async (id) => {
  return await post(endpoints.eliminarLiquidacion, { id: id });
};