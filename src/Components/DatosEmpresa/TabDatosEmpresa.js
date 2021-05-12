import React from "react";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { formatDateWithTimeToString } from "../Common/DateHelpers";
import { Textbox, MessageModal, CustomButton } from "../Common";

import { validateRequired } from "../Common/Validations";
import {
  editarDatosEmpresa,
} from "../../Services/datosEmpresaServices";

const ButtonContainer = styled(Container)({
  textAlign: "center",
  marginTop: "20px",
  padding: 0,
});

export default function MisDatos(props) {
  const [form, setForm] = React.useState({
    id: props?.data?.id ?? 0,
    nombre: props?.data?.nombre ?? "",
    cuit: props?.data?.cuit ?? "",
    cbu: props?.data?.cbu ?? "",
    cuentaCorriente: props?.data?.cuentaCorriente ?? "",
    cajaAhorro: props?.data?.cajaAhorro ?? "",
  });

  const [validations, setValidations] = React.useState({
    nombre: true,
    cuit: true,
    cbu: true,
    cuentaCorriente: true,
    cajaAhorro: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    nombre: "",
    cuit: "",
    cbu: "",
    cuentaCorriente: "",
    cajaAhorro: "",
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const handleGuardar = async () => {
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsSaving(true);

      var request = {
        id: form?.id,
        nombre: form?.nombre,
        cuit: form?.cuit,
        cbu: form?.cbu,
        cuentaCorriente: form?.cuentaCorriente,
        cajaAhorro: form?.cajaAhorro,
      };

      editarDatosEmpresa(request)
        .then((response) => {
          onGuardarResponseOk(response);
        })
        .catch((error) => {
          onGuardarResponseError(error);
        });
    }
  };

  const validateForm = async () => {


    var isNombreValid = await validateRequired(form.nombre);
    var isCuitValid = await validateRequired(form.cuit);
    var isCbuValid = await validateRequired(form.cbu);
    var isCuentaCorrienteValid = await validateRequired(form.cuentaCorriente);
    var isCajaAhorroValid = await validateRequired(form.cajaAhorro);

    var nombreValidationMessage = "El Nombre es requerido...";
    var cuitValidationMessage = "El CUIT es requerido...";
    var cbuValidationMessage = "El CBU es requerido...";
    var cuentaCorrienteValidationMessage = "La Cuenta Corriente es requerida...";
    var cajaAhorroValidationMessage = "La Caja de Ahorro es requerido...";

    setValidations((prevState) => ({
      ...prevState,
      nombre: isNombreValid,
      cuit: isCuitValid,
      cbu: isCbuValid,
      cuentaCorriente: isCuentaCorrienteValid,
      cajaAhorro: isCajaAhorroValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      nombre: nombreValidationMessage,
      cuit: cuitValidationMessage,
      cbu: cbuValidationMessage,
      cuentaCorriente: cuentaCorrienteValidationMessage,
      cajaAhorro: cajaAhorroValidationMessage,
    }));

    return isNombreValid && isCuitValid && isCbuValid && isCuentaCorrienteValid && isCajaAhorroValid;

  };

  const [messageModal, setMessageModal] = React.useState(null);

  const limpiarValidaciones = () => {
    setValidations((prevState) => ({
      ...prevState,
      nombre: true,
      cuit: true,
      cbu: true,
      cuentaCorriente: true,
      cajaAhorro: true,
    }));
    setValidationMessages((prevState) => ({
      ...prevState,
      nombre: "",
      cuit: "",
      cbu: "",
      cuentaCorriente: "",
      cajaAhorro: "",
    }));
  };

  const onGuardarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      isSuccess: true,
      isError: false,
      severity: "success", //success | error | warning | info
      title: "¡Actualización de Datos de la empresa exitosa!",
      message: "Los datos de la empresa fueron actualizados correctamente.",
    });

    setIsSaving(false);
    limpiarValidaciones();
  };

  const onGuardarResponseError = (error) => {
    setMessageModal({
      isOpen: true,
      isSuccess: false,
      isError: true,
      severity: "error",
      title: "Actualización de Datos de la empresa errónea",
      message: "Oops! Ocurrió un error al actualizar los datos de la empresa.",
    });
  };

  const handleAceptarMessageModal = () => {
    setMessageModal({ isOpen: false });
    props.recargarDatosEmpresaEvent();
  };

  const handleCerrarMessageModal = () => {
    setMessageModal({ isOpen: false });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="nombre"
            placeholder="Nombre del Establecimiento"
            value={form.nombre}
            isDisabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="cuit"
            placeholder="CUIT"
            value={form.cuit}
            handleChange={handleChange}
            isValid={validations.cuit}
            validationMessage={validationMessages.cuit}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="cbu"
            placeholder="CBU"
            value={form.cbu}
            handleChange={handleChange}
            isValid={validations.cbu}
            validationMessage={validationMessages.cbu}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="cuentaCorriente"
            placeholder="Cuenta Corriente"
            value={form.cuentaCorriente}
            handleChange={handleChange}
            isValid={validations.cuentaCorriente}
            validationMessage={validationMessages.cuentaCorriente}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="cajaAhorro"
            placeholder="Caja Ahorro"
            value={form.cajaAhorro}
            handleChange={handleChange}
            isValid={validations.cajaAhorro}
            validationMessage={validationMessages.cajaAhorro}
          />
        </Grid>
      </Grid>

      <ButtonContainer maxWidth="lg">
        <CustomButton
          isLoading={isSaving}
          handleClick={handleGuardar}
          text="Guardar"
          loadingText="Guardando..."
          isFullWidth
        />
      </ButtonContainer>

      <MessageModal
          isOpen={messageModal?.isOpen}
          isLoading={messageModal?.isLoading}
          title={messageModal?.title}
          message={messageModal?.message}
          isSuccess={messageModal?.isSuccess}
          isError={messageModal?.isError}
          handleSuccess={handleAceptarMessageModal}
          handleError={handleCerrarMessageModal}
          handleClose={handleCerrarMessageModal}
        />
    </div>
  );
}
