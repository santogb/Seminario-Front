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

export default function ModalLiquidacionEmpleados(props) {
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
              <span>Alta de Liquidacion Mensual</span>
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
                <Grid container spacing={3}>
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
            </form>
          </DialogContent>
          <DialogActions>
            <CustomButton
              isLoading={props.isSaving}
              handleClick={props.handleLiquidar}
              text="Liquidar"
              loadingText="Liquidando..."
              isFullWidth
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
