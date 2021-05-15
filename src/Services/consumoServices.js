import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearConsumo = async (data) => {
  return await post(endpoints.crearConsumo, {
    idTipoPago: data.idTipoPago,
    idTipoAbono: data.idTipoAbono,
    idSocio: data.idSocio,
    monto: data.monto,
    nroOperacionTarjeta: data.nroOperacionTarjeta,
    cuotas: data.cuotas
  });
};

export const listarConsumos = async () => {
  return await get(endpoints.listarConsumosManuales);
};

export const obtenerConsumo = async (id) => {
  return await getById(endpoints.obtenerConsumoManual, id);
};

export const eliminarConsumo = async (id) => {
  return await post(endpoints.eliminarConsumoManual, { id: id });
};

export const editarConsumo = async (data) => {
  return await post(endpoints.editarConsumoManual, {
    id: data.id,
    idTipoPago: data.idTipoPago,
    idAbono: data.idAbono,
    idEstadoPago: data.idEstadoPago,
  });
};