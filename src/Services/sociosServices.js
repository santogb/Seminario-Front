import endpoints from "./endpoints";
import { get, getById, post } from "./endpointServices";

export const crearSocio = async (data) => {
  return await post(endpoints.crearSocio, {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    dni: data.dni,
    fechaNacimiento: data.fechaNacimiento,
    domicilio: data.domicilio,
    localidad: data.localidad,
    telefono: data.telefono,
    obraSocial: data.obraSocial,
    nroSocio: data.nroSocio,
    telefonoEmergencia: data.telefonoEmergencia,
    contactoEmergencia: data.contactoEmergencia,
    grupoSanguineo: data.grupoSanguineo,
    esFumador: data.esFumador,
    esCardiaco: data.esCardiaco,
    esAlergico: data.esAlergico,
    esAsmatico: data.esAsmatico,
    observacionAlergia: data.observacionAlergia,
    observacionAsma: data.observacionAsma,
    aptoFisico: data.aptoFisico,
    fechaAptoFisico: data.fechaAptoFisico,
  });
};

export const listarSocios = async () => {
  return await get(endpoints.listarSocios);
};

export const obtenerSocio = async (id) => {
  return await getById(endpoints.obtenerSocio, id);
};

export const obtenerSocioPorDni = async (dni) => {
  return await get(endpoints.obtenerSocioPorDni + "?dni=" + dni);
};

export const eliminarSocio = async (id) => {
  return await post(endpoints.eliminarSocio, { id: id });
};

export const editarSocio = async (data) => {
  return await post(endpoints.editarSocio, {
    id: data.id,
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    dni: data.dni,
    fechaNacimiento: data.fechaNacimiento,
    domicilio: data.domicilio,
    localidad: data.localidad,
    telefono: data.telefono,
    obraSocial: data.obraSocial,
    nroSocio: data.nroSocio,
    telefonoEmergencia: data.telefonoEmergencia,
    contactoEmergencia: data.contactoEmergencia,
    grupoSanguineo: data.grupoSanguineo,
    esFumador: data.esFumador,
    esCardiaco: data.esCardiaco,
    esAlergico: data.esAlergico,
    esAsmatico: data.esAsmatico,
    observacionAlergia: data.observacionAlergia,
    observacionAsma: data.observacionAsma,
    aptoFisico: data.aptoFisico,
    fechaAptoFisico: data.fechaAptoFisico,
  });
};
