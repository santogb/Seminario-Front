import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearServicio = async (data) => {
  return await post(endpoints.crearServicio, {
    idTipoServicio: data.idTipoServicio,
    idEmpleado: data.idEmpleado,
    horarioMañana: data.horarioMañana,
    horarioTarde: data.horarioTarde,
    horarioNoche: data.horarioNoche,
    lunes: data.lunes,
    martes: data.martes,
    miercoles: data.miercoles,
    jueves: data.jueves,
    viernes: data.viernes,
    sabado: data.sabado,
    domingo: data.domingo,
    cantHorasDia: data.cantHorasDia,
  });
};

export const listarServicios = async () => {
  return await get(endpoints.listarServicios);
};

export const listarServiciosPorSemana = async () => {
  return await get(endpoints.listarServiciosPorSemana);
};

export const eliminarServicio = async (id) => {
  return await post(endpoints.eliminarServicio, { id: id });
};

export const editarServicio = async (data) => {
  return await post(endpoints.editarServicio, {
    id: data.id,
    idTipoServicio: data.idTipoServicio,
    idEmpleado: data.idEmpleado,
    horarioMañana: data.horarioMañana,
    horarioTarde: data.horarioTarde,
    horarioNoche: data.horarioNoche,
    lunes: data.lunes,
    martes: data.martes,
    miercoles: data.miercoles,
    jueves: data.jueves,
    viernes: data.viernes,
    sabado: data.sabado,
    domingo: data.domingo,
    cantHorasDia: data.cantHorasDia,
  });
};
