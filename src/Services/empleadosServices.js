import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearEmpleado = async (data) => {
  return await post(endpoints.crearEmpleado, {
    idTipoEmpleado: data.idTipoEmpleado,
    nombre: data.nombre,
    apellido: data.apellido,
    password: data.password,
    email: data.email,
    dni: data.dni,
    sueldoBase: data.sueldoBase,
    sueldoHora: data.sueldoHora,
  });
};

export const login = async (email, password) => {
  return await post(endpoints.login, {
    email: email,
    password: password,
  });
};

export const listarEmpleados = async (idTipoEmpleado) => {
  return await get(endpoints.listarEmpleados + (idTipoEmpleado ? "?idTipoEmpleado=" + idTipoEmpleado : ""));
};

export const obtenerEmpleado = async (id) => {
  return await getById(endpoints.obtenerEmpleado, id);
};

export const obtenerEmpleadoPorDni = async (dni) => {
  return await get(endpoints.obtenerEmpleadoPorDni + "?dni=" + dni);
};

export const eliminarEmpleado = async (id) => {
  return await post(endpoints.eliminarEmpleado, { id: id });
};

export const editarEmpleado = async (data) => {
  return await post(endpoints.editarEmpleado, {
    id: data.id,
    idTipoEmpleado: data.idTipoEmpleado,
    nombre: data.nombre,
    apellido: data.apellido,
    dni: data.dni,
    estado: data.estado,
    sueldoBase: data.sueldoBase,
    sueldoHora: data.sueldoHora,
  });
};
