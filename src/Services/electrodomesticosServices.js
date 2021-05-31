import endpoints from "./endpoints";
import { get, getByIdAt, post, deleteById } from "./endpointServices";

export const obtenerElectrodomestico = async (id) => {
    return await getByIdAt(endpoints.obtenerElectrodomestico,id,"idElectrodomestico");
};