import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearFacturaciones = async (data) => {
  return await post(endpoints.crearFacturacion, {
    idTipoPago: data.idTipoPago,
    idTipoAbono: data.idTipoAbono,
    idSocio: data.idSocio,
    monto: data.monto,
    nroOperacionTarjeta: data.nroOperacionTarjeta,
    cuotas: data.cuotas
  });
};

export const listarFacturaciones = async () => {
  return await get(endpoints.listarFacturaciones);
};

export const obtenerFacturacion = async (id) => {
  return await getById(endpoints.obtenerFacturacion, id);
};

export const eliminarFacturacion = async (id) => {
  return await post(endpoints.eliminarFacturacion, { id: id });
};

export const editarFacturacion = async (data) => {
  return await post(endpoints.editarFacturacion, {
    id: data.id,
    idTipoPago: data.idTipoPago,
    idAbono: data.idAbono,
    idEstadoPago: data.idEstadoPago,
  });
};