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
import CustomCheckbox from "../Common/CustomCheckbox";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalServicio(props) {
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
              {props.modalABM === "A" && <span>Alta de Servicio</span>}
              {props.modalABM === "B" && <span>Baja de Servicio</span>}
              {props.modalABM === "M" && <span>Edición de Servicio</span>}
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
                <Container>
                  <Grid container spacing={3}>
                  <Grid container spacing={3}>  
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                        <Dropdown
                          propName="idTipoServicio"
                          placeholder="Tipo Servicio"
                          value={props.form.idTipoServicio}
                          handleChange={props.handleChange}
                          isValid={props.validations.idTipoServicio}
                          validationMessage={
                            props.validationMessages.idTipoServicio
                          }
                          options={props.tiposServicio}
                          optionValueProp="id"
                          optionTextProp="tipoServicio"
                        />
                    </Grid>
                      <Grid item xl={12} lg={12} md={12} xs={12}>
                        <Dropdown
                          propName="idEmpleado"
                          placeholder="Profesor"
                          value={props.form.idEmpleado}
                          handleChange={props.handleChange}
                          isValid={props.validations.idEmpleado}
                          validationMessage={
                            props.validationMessages.idEmpleado
                          }
                          options={props.empleados}
                          optionValueProp="id"
                          optionTextProp="apellido"
                          optionTextProp2="nombre"
                        />
                      </Grid>
                  </Grid>

                  <Grid container spacing={1} space-around>
                      <Grid item xl={12} lg={12} md={12} xs={12}>
                      <h3>Horario</h3>
                      </Grid>
                      <Grid item xl={4} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="horarioMañana"
                          text="Mañana"
                          value={props.form.horarioMañana}
                          handleChange={props.handleChange}
                        />
                      </Grid>
                      <Grid item xl={4} lg={6} md={12} xs={12}>
                          <CustomCheckbox 
                            propName="horarioTarde"
                            text="Tarde"
                            value={props.form.horarioTarde}
                            handleChange={props.handleChange}
                          />
                      </Grid>
                      <Grid item xl={4} lg={6} md={12} xs={12}>
                          <CustomCheckbox 
                            propName="horarioNoche"
                            text="Noche"
                            value={props.form.horarioNoche}
                            handleChange={props.handleChange}
                          />
                      </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                    <h3>Día</h3>
                    </Grid>
                <Grid container spacing={3}>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="lunes"
                          text="Lu"
                          value={props.form.lunes}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="martes"
                          text="Ma"
                          value={props.form.martes}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="miercoles"
                          text="Mie"
                          value={props.form.miercoles}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="jueves"
                          text="Ju"
                          value={props.form.jueves}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={4} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="viernes"
                          text="Vi"
                          value={props.form.viernes}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="sabado"
                          text="Sa"
                          value={props.form.sabado}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={2} lg={6} md={12} xs={12}>
                        <CustomCheckbox 
                          propName="domingo"
                          text="Dom"
                          value={props.form.domingo}
                          handleChange={props.handleChange}
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Textbox
                        propName="cantHorasDia"
                        placeholder="Horas / Clase"
                        value={props.form.cantHorasDia}
                        handleChange={props.handleChange}
                        isValid={props.validations.cantHorasDia}
                        validationMessage={props.validationMessages.cantHorasDia}
                      />
                    </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                </Container>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea eliminar al servicio '
                  {props.form?.tipoServicio}'?
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
