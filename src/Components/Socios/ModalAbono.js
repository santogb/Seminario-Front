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

export default function ModalAbono(props) {
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
            <Typography variant="h6">Asignación de Abono</Typography>
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
                <Grid container spacing={3}>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Dropdown
                      propName="idTipoAbono"
                      placeholder="Tipo Abono"
                      value={props.form.idTipoAbono}
                      handleChange={props.handleChange}
                      isValid={props.validations.idTipoAbono}
                      validationMessage={props.validationMessages.idTipoAbono}
                      options={props.tiposAbono}
                      optionValueProp="id"
                      optionTextProp="tipoAbono"
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="fechaInicio"
                      placeholder="F. Inicio"
                      value={props.form.fechaInicio}
                      handleChange={props.handleChange}
                      isValid={props.validations.fechaInicio}
                      validationMessage={props.validationMessages.fechaInicio}
                      isDate
                    />
                  </Grid>
                </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <CustomButton
              isLoading={props.isSaving}
              handleClick={props.handleGuardar}
              text="Guardar"
              loadingText="Guardando..."
              isFullWidth
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
