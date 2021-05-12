import endpoints from "./endpoints";
import { get, post } from "./endpointServices";

export const listarDatosEmpresa = async () => {
  return await get(endpoints.listarDatosEmpresa);
};

export const editarDatosEmpresa = async (data) => {
  return await post(endpoints.editarDatosEmpresa, {
    id: data.id,
    nombre: data.nombre,
    cuit: data.cuit,
    cbu: data.cbu,
    cuentaCorriente: data.cuentaCorriente,
    cajaAhorro: data.cajaAhorro,
  });
};