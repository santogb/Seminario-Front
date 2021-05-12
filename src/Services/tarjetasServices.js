import endpoints from "./endpoints";
import { post, postToken } from "./endpointServices";

export const crearConsumoTarjeta = async (data) => {
  return await post(endpoints.crearConsumoTarjetaAuthentication, {
    id: "71c9d154-9c23-4b03-9294-b0340eaae026",
    key: "*V5dhfBGRtCgWMBIsvU7",
  }).then(async (response) => {
    if (response.isAuthenticated) {
      return await postToken(
        endpoints.crearConsumoTarjeta,
        {
          nroTarjeta: data.nroTarjeta,
          ccv: data.ccv,
          monto: data.monto,
          establecimientoId: 5,
        },
        response.token
      );
    }else{
      return Promise({
        codigo: 0,
        mensaje: "Ocurrió un error al autenticarse con Tarjeta B."
      })
    }
  });
};
