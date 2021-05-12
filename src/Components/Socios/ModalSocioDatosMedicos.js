import React from "react";
import Grid from "@material-ui/core/Grid";

import { Textbox } from "../Common";
import CustomCheckbox from "../Common/CustomCheckbox";

export default function ModalSocioDatosPersonales(props) {
  
  var esDetalle = props.modalABM === "D";

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="grupoSanguineo"
            placeholder="Grupo Sanguíneo"
            value={props.form.grupoSanguineo}
            handleChange={props.handleChange}
            isValid={props.validations.grupoSanguineo}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.grupoSanguineo}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="obraSocial"
            placeholder="Obra Social / Prepaga"
            value={props.form.obraSocial}
            handleChange={props.handleChange}
            isValid={props.validations.obraSocial}
            isDisabled={esDetalle}
            validationMessage={props.validationMessages.obraSocial}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Textbox
            propName="nroSocio"
            placeholder="N° Afiliado"
            value={props.form.nroSocio}
            handleChange={props.handleChange}
            isValid={props.validations.nroSocio}
            isDisabled={esDetalle}
            isNumber
            validationMessage={props.validationMessages.nroSocio}
          />
        </Grid>
        <Grid item xl={4} lg={6} md={12} xs={12}>
            <CustomCheckbox 
              propName="esFumador"
              text="¿Es Fumador?"
              value={props.form.esFumador}
              handleChange={props.handleChange}
              isDisabled={esDetalle}
            />
        </Grid>
        <Grid item xl={4} lg={6} md={12} xs={12}>
            <CustomCheckbox 
              propName="esCardiaco"
              text="¿Es Cardíaco?"
              value={props.form.esCardiaco}
              handleChange={props.handleChange}
              isDisabled={esDetalle}
            />
        </Grid>
        <Grid item xl={4} lg={6} md={12} xs={12}>
            <CustomCheckbox 
              propName="esAsmatico"
              text="¿Es Asmático?"
              value={props.form.esAsmatico}
              handleChange={props.handleChange}
              isDisabled={esDetalle}
            />
        </Grid>
        <Grid item xl={4} lg={6} md={12} xs={12}>
            <CustomCheckbox 
              propName="esAlergico"
              text="¿Es Alérgico?"
              value={props.form.esAlergico}
              handleChange={props.handleChange}
              isDisabled={esDetalle}
            />
        </Grid>
        <Grid item xl={6} lg={6} md={12} xs={12}>
            <CustomCheckbox 
              propName="aptoFisico"
              text="Presenta Apto Físico"
              value={props.form.aptoFisico}
              handleChange={props.handleChange}
              isDisabled={esDetalle}
            />
        </Grid>
      </Grid>
    </div>
  );
}
