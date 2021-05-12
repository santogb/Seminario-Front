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

export default function ModalEmpleado(props) {
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
              {props.modalABM === "A" && <span>Alta de Empleado</span>}
              {props.modalABM === "B" && <span>Baja de Empleado</span>}
              {props.modalABM === "M" && <span>Edición de Empleado</span>}
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
                      propName="nombre"
                      placeholder="Nombre"
                      value={props.form.nombre}
                      handleChange={props.handleChange}
                      isValid={props.validations.nombre}
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
                      isDisabled={props.modalABM === "M"}
                      validationMessage={props.validationMessages.email}
                    />
                  </Grid>

                  {props.modalABM !== "M" && (
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Textbox
                        propName="password"
                        placeholder="Password"
                        value={props.form.password}
                        handleChange={props.handleChange}
                        isValid={props.validations.password}
                        isPassword
                        validationMessage={props.validationMessages.password}
                      />
                    </Grid>
                  )}

                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Dropdown
                      propName="idTipoEmpleado"
                      placeholder="Tipo Empleado"
                      value={props.form.idTipoEmpleado}
                      handleChange={props.handleChange}
                      isValid={props.validations.idTipoEmpleado}
                      isDisabled={props.modalABM === "M"}
                      validationMessage={
                        props.validationMessages.idTipoEmpleado
                      }
                      options={props.tiposEmpleado}
                      optionValueProp="id"
                      optionTextProp="tipoEmpleado"
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
                      validationMessage={props.validationMessages.sueldoBase}
                    />
                  </Grid>
                  {props?.form?.idTipoEmpleado === 1 && (
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Textbox
                        propName="sueldoHora"
                        placeholder="Sueldo Hora"
                        value={props.form.sueldoHora}
                        handleChange={props.handleChange}
                        isValid={props.validations.sueldoHora}
                        isNumber
                        validationMessage={props.validationMessages.sueldoHora}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea eliminar al empleado '
                  {props.form?.apellido + ", " + props.form?.nombre}'?
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
