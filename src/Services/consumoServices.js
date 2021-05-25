import endpoints from "./endpoints";
import { get, getById, post, deleteById } from "./endpointServices";

export const crearConsumo = async (data) => {
  return await post(endpoints.crearConsumo, {
    idUsuario: data.idUsuario,
    periodo: data.periodo,
    kwh: data.kwh,
    consumoTotal: data.consumoTotal
  });
};
export const crearConsumoOCR = async (data) => {
  return await post(endpoints.crearConsumoOCR, {
    imgUrl: data.imgUrl
  });
};

export const listarConsumos = async (data) => {
  return await getById(endpoints.listarConsumosManuales,data);
};

export const obtenerConsumo = async (id) => {
  return await getById(endpoints.obtenerConsumoManual, {"idUsuario":id});
};

export const eliminarConsumo = async (data) => {
  return await deleteById(endpoints.eliminarConsumoManual, { data: { "idConsumo": data.id,"idUsuario": data.idUsuario } });
};

export const editarConsumo = async (data) => {
  return await post(endpoints.editarConsumoManual, {
    id: data.id,
    idTipoPago: data.idTipoPago,
    idAbono: data.idAbono,
    idEstadoPago: data.idEstadoPago,
  });
};