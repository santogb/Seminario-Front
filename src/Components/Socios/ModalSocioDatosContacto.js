import React from "react";

import Grid from "@material-ui/core/Grid";

import { Textbox } from "../Common";

export default function ModalSocioDatosPersonales(props) {
  
  var esDetalle = props.modalABM === "D";

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="domicilio"
            placeholder="Domicilio"
            value={props.form.domicilio}
            handleChange={props.handleChange}
            isValid={props.validations.domicilio}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.domicilio}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="localidad"
            placeholder="Localidad"
            value={props.form.localidad}
            handleChange={props.handleChange}
            isValid={props.validations.localidad}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.localidad}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="telefono"
            placeholder="Teléfono"
            value={props.form.telefono}
            handleChange={props.handleChange}
            isValid={props.validations.telefono}
            isDisabled={esDetalle}
            isNumber
            validationMessage={props.validationMessages.telefono}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="telefonoEmergencia"
            placeholder="Tel. Emergencia"
            value={props.form.telefonoEmergencia}
            handleChange={props.handleChange}
            isValid={props.validations.telefonoEmergencia}
            isDisabled={esDetalle}
            isNumber
            validationMessage={props.validationMessages.telefonoEmergencia}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="contactoEmergencia"
            placeholder="Contacto de Emergencia"
            value={props.form.contactoEmergencia}
            handleChange={props.handleChange}
            isValid={props.validations.contactoEmergencia}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.contactoEmergencia}
          />
        </Grid>
      </Grid>
    </div>
  );
}
