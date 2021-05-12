import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearTipoAbono = async (data) => {
  return await post(endpoints.crearTipoAbono, {
    tipoAbono: data.tipoAbono,
    precio: data.precio,
    cantDias: data.cantDias,
  });
};

export const listarTiposAbono = async () => {
  return await get(endpoints.listarTiposAbono);
};

export const obtenerTipoAbono = async (id) => {
  return await getById(endpoints.obtenerTipoAbono, id);
};

export const eliminarTipoAbono = async (id) => {
  return await post(endpoints.eliminarTipoAbono, { id: id });
};

export const editarTipoAbono = async (data) => {
  return await post(endpoints.editarTipoAbono, {
    id: data.id,
    tipoAbono: data.tipoAbono,
    precio: data.precio,
    cantDias: data.cantDias,
  });
};
