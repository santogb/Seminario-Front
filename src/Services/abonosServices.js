import endpoints from "./endpoints";
import { getById, post } from "./endpointServices";

export const crearAbono = async (data) => {
  return await post(endpoints.crearAbono, {
    idSocio: data.idSocio,
    idTipoAbono: data.idTipoAbono,
    idEstadoPago: 1,
    fechaDesde: data.fechaDesde,
    fechaHasta: data.fechaHasta
  });
};

export const obtenerAbono = async (id) => {
  return await getById(endpoints.obtenerAbono, id);
};

export const eliminarAbono = async (id) => {
  return await post(endpoints.eliminarAbono, { id: id });
};

export const editarAbono = async (data) => {
  return await post(endpoints.editarAbono, {
    id: data.id,
    idSocio: data.idSocio,
    idTipoAbono: data.idTipoAbono,
    idEstadoPago: data.idEstadoPago,
    fechaDesde: data.fechaDesde,
    fechaHasta: data.fechaHasta
  });
};
