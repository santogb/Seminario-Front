import React from "react";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { formatDateWithTimeToString } from "../Common/DateHelpers";
import { Textbox, MessageModal, CustomButton } from "../Common";

import { validateRequired } from "../Common/Validations";
import {
  getIdEmpleado,
  getIdTipoEmpleado,
} from "../../Services/sessionServices";
import { editarEmpleado } from "../../Services/empleadosServices";

const ButtonContainer = styled(Container)({
  textAlign: "center",
  marginTop: "20px",
  padding: 0,
});

export default function MisDatos(props) {
  const [form, setForm] = React.useState({
    nombre: props?.data?.nombre ?? "",
    apellido: props?.data?.apellido ?? "",
    dni: props?.data?.dni ?? null,
  });

  const [validations, setValidations] = React.useState({
    nombre: true,
    apellido: true,
    dni: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    nombre: "",
    apellido: "",
    dni: "",
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
        id: getIdEmpleado(),
        idTipoEmpleado: getIdTipoEmpleado(),
        nombre: form.nombre,
        apellido: form.apellido,
        dni: form.dni,
        estado: true,
      };

      editarEmpleado(request)
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
    var isApellidoValid = await validateRequired(form.apellido);
    var isDniValid = await validateRequired(form.dni);

    var nombreValidationMessage = "El Nombre es requerido...";
    var apellidoValidationMessage = "El Apellido es requerido...";
    var dniValidationMessage = "El DNI es requerido...";

    setValidations((prevState) => ({
      ...prevState,
      nombre: isNombreValid,
      apellido: isApellidoValid,
      dni: isDniValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      nombre: nombreValidationMessage,
      apellido: apellidoValidationMessage,
      dni: dniValidationMessage,
    }));

    return isNombreValid && isApellidoValid && isDniValid;
  };

  const [messageModal, setMessageModal] = React.useState(null);

  const limpiarValidaciones = () => {
    setValidations((prevState) => ({
      ...prevState,
      nombre: true,
      apellido: true,
      dni: true,
    }));
    setValidationMessages((prevState) => ({
      ...prevState,
      nombre: "",
      apellido: "",
      dni: "",
    }));
  };

  const onGuardarResponseOk = (response) => {
    setMessageModal({
      isOpen: true,
      isSuccess: true,
      isError: false,
      severity: "success", //success | error | warning | info
      title: "¡Actualización de Mis Datos exitosa!",
      message: "Los datos del usuario fueron actualizados correctamente.",
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
      title: "Actualización de Mis Datos errónea",
      message: "Oops! Ocurrió un error al actualizar tus datos.",
    });
  };

  const handleAceptarMessageModal = () => {
    setMessageModal({ isOpen: false });
    props.recargarMisDatosEvent();
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
            placeholder="Nombre"
            value={form.nombre}
            handleChange={handleChange}
            isValid={validations.nombre}
            validationMessage={validationMessages.nombre}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="apellido"
            placeholder="Apellido"
            value={form.apellido}
            handleChange={handleChange}
            isValid={validations.apellido}
            validationMessage={validationMessages.apellido}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            propName="dni"
            placeholder="DNI"
            value={form.dni}
            handleChange={handleChange}
            isValid={validations.dni}
            validationMessage={validationMessages.dni}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            placeholder="Email"
            value={props.data.email}
            isDisabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            placeholder="Tipo Empleado"
            value={props.data.tipo?.tipoEmpleado}
            isDisabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            placeholder="Estado"
            value={props.data.estado ? "Activo" : "Inactivo"}
            isDisabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            placeholder="F. Alta"
            value={formatDateWithTimeToString(props.data.createdAt)}
            isDisabled
            isDate
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Textbox
            placeholder="F. Modificación"
            value={formatDateWithTimeToString(props.data.updatedAt)}
            isDisabled
            isDate
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
