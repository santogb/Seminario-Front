import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Textbox, Dropdown, CustomButton } from "../Common";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalLiquidacion(props) {
  const classes = useStyles();

  return (
    <div>
      {props.isOpen && (
        <Dialog
          open={props.isOpen}
          onClose={props.handleCerrar}
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <MuiDialogTitle disableTypography id="alert-dialog-title">
            <Typography variant="h6">
              {props.modalABM === "A" && <span>Alta de Liquidacion</span>}
              {props.modalABM === "B" && <span>Baja de Liquidacion</span>}
              {props.modalABM === "M" && <span>Edición de Liquidacion</span>}
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={props.handleCerrar}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent dividers>
            <form className={classes.root} autoComplete="off">
              {(props.modalABM === "A" || props.modalABM === "M") && (
                <Grid container spacing={3}>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="dni"
                      placeholder="DNI"
                      value={props.form.dni}
                      handleChange={props.handleChangeDni}
                      isValid={props.validations.dni}
                      validationMessage={props.validationMessages.dni}
                      isNumber
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <CustomButton
                      isLoading={props.isBuscandoEmpleado}
                      handleClick={props.handleBuscarEmpleado}
                      text="Buscar"
                      loadingText="Buscando"
                      isFullWidth
                      />
                  </Grid>

                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="Nombre"
                      placeholder="Nombre y Apellido"
                      value={props.form.nombre}
                      isDisabled
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                        propName="fechaLiquidacion"
                        placeholder="Período de Liquidación"
                        value={props.form.fechaLiquidacion}
                        handleChange={props.handleChange}
                        isValid={props.validations.fechaLiquidacion}
                        isMonth
                        validationMessage={props.validationMessages.fechaLiquidacion}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="sueldoBase"
                      placeholder="Sueldo Base"
                      value={props.form.sueldoBase}
                      handleChange={props.handleChange}
                      isValid={props.validations.sueldoBase}
                      isNumber
                      isDisabled
                      validationMessage={props.validationMessages.sueldoBase}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="sueldoHora"
                      placeholder="Sueldo Hora"
                      value={props.form.sueldoHora}
                      handleChange={props.handleChange}
                      isValid={props.validations.sueldoHora}
                      isNumber
                      isDisabled
                      validationMessage={props.validationMessages.sueldoHora}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Dropdown
                        propName="idTipoPago"
                        placeholder="Tipo Pago"
                        value={props.form.idTipoPago}
                        handleChange={props.handleChange}
                        isValid={props.validations.idTipoPago}
                        validationMessage={
                          props.validationMessages.idTipoPago
                        }
                        options={props.tiposPago}
                        optionValueProp="id"
                        optionTextProp="tipoPago"
                      />
                  </Grid>
                </Grid>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea dar de baja la LIquidacion?
                </p>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <CustomButton
              isLoading={props.isSaving}
              handleClick={
                props.modalABM !== "B"
                  ? props.handleGuardar
                  : props.handleEliminar
              }
              text={props.modalABM !== "B" ? "Guardar" : "Eliminar"}
              loadingText={
                props.modalABM !== "B" ? "Guardando..." : "Eliminando..."
              }
              isFullWidth
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
