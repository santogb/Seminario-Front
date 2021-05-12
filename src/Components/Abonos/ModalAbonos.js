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
import { Textbox, CustomButton } from "../Common";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalTipoAbono(props) {
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
              {props.modalABM === "A" && <span>Alta de Tipo de Abono</span>}
              {props.modalABM === "B" && <span>Baja de Tipo de Abono</span>}
              {props.modalABM === "M" && <span>Edición de Tipo de Abono</span>}
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
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="tipoAbono"
                      placeholder="Tipo"
                      value={props.form.tipoAbono}
                      handleChange={props.handleChange}
                      isValid={props.validations.tipoAbono}
                      validationMessage={props.validationMessages.tipoAbono}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="precio"
                      placeholder="Precio"
                      value={props.form.precio}
                      handleChange={props.handleChange}
                      isValid={props.validations.precio}
                      isNumber
                      validationMessage={props.validationMessages.precio}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="cantDias"
                      placeholder="Cant. Días"
                      value={props.form.cantDias}
                      handleChange={props.handleChange}
                      isValid={props.validations.cantDias}
                      isNumber
                      validationMessage={props.validationMessages.cantDias}
                    />
                  </Grid>
                </Grid>
                </Container>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea eliminar el tipo de abono '
                  {props.form?.tipoAbono}'?
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
