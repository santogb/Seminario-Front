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
            propName="nombre"
            placeholder="Nombre"
            value={props.form.nombre}
            handleChange={props.handleChange}
            isValid={props.validations.nombre}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.nombre}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="apellido"
            placeholder="Apellido"
            value={props.form.apellido}
            handleChange={props.handleChange}
            isValid={props.validations.apellido}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.apellido}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="dni"
            placeholder="DNI"
            value={props.form.dni}
            handleChange={props.handleChange}
            isValid={props.validations.dni}
            isDisabled={esDetalle}
            isNumber
            validationMessage={props.validationMessages.dni}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="email"
            placeholder="Email"
            value={props.form.email}
            handleChange={props.handleChange}
            isValid={props.validations.email}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.email}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="fechaNacimiento"
            placeholder="Fecha Nacimiento"
            value={props.form.fechaNacimiento}
            handleChange={props.handleChange}
            isValid={props.validations.fechaNacimiento}
            isDisabled={esDetalle}
            isDate
            validationMessage={props.validationMessages.fechaNacimiento}
          />
        </Grid>
      </Grid>
    </div>
  );
}
