import endpoints from "./endpoints";
import { get, getById, post, deleteById } from "./endpointServices";

export const listarInfiniTips = async () => {
    return await get(endpoints.listarInfiniTips);
};