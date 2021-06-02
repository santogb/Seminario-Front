import endpoints from "./endpoints";
import { get, getById, post, deleteById } from "./endpointServices";

export const crearEstimado = async (data) => {
    return await post(endpoints.crearEstimado, {
        idUsuario: data.idUsuario,
        tiempo: data.tiempo,
        status: "bueno",
        idElectrodomestico: data.idElectrodomestico
    });
};

export const listarEstimados = async (data) => {
    return await getById(endpoints.listarEstimados,data);
};

export const obtenerEstimado = async (id) => {
    return await getById(endpoints.obtenerEstimado, {"idUsuario":id});
};
export const eliminarEstimado = async (data) => {
    return await deleteById(endpoints.eliminarEstimado, { data: { "idConsumoEstimado": data.id,"idUsuario": data.idUsuario } });
};
