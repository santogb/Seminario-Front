import endpoints from "./endpoints";
import { get } from "./endpointServices";

export const listarTiposEmpleado = async () => {
  return await get(endpoints.listarTiposEmpleado);
};

export const listarTiposPago = async () => {
  return await get(endpoints.listarTiposPago);
};

export const listarTiposServicio = async () => {
  return await get(endpoints.listarTiposServicio);
};

export const listarEstadosPago = async () => {
  return await get(endpoints.listarEstadosPago);
};

