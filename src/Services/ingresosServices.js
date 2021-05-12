import endpoints from "./endpoints";
import { get, post } from "./endpointServices";

export const crearIngreso = async (data) => {
  return await post(endpoints.crearIngreso, {
    idSocio: data.idSocio,
    idEmpleado: data.idEmpleado,
    fecha: data.fecha
  });
};

export const listarIngresos = async () => {
  return await get(endpoints.listarIngresos);
};

export const listarIngresosPorEmpleado = async (id) => {
  return await get(endpoints.listarIngresosPorEmpleado + "?id=" + id);
};

export const listarIngresosPorSocio = async (id) => {
  return await get(endpoints.listarIngresosPorSocio + "?id=" + id);
};
