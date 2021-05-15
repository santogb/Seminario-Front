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
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalConsumo(props) {
  const classes = useStyles();
  const [fecha, setFecha] = React.useState(0);
  setFecha(props.form.date);
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
              {props.modalABM === "A" && <span>Alta de Consumo</span>}
              {props.modalABM === "B" && <span>Baja de Consumo</span>}
              {props.modalABM === "M" && <span>Edición de Consumo</span>}
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
                    <DatePicker
                      propName="Period"
                      placeholder="Period"                      
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      selected={fecha}    
                      //onChange={setFecha(this)}                  
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="monto"
                      placeholder="Monto"
                      value={props.form.monto}
                      isValid={props.validations.idAbono}
                      validationMessage={props.validationMessages.idAbono}
                      isDisabled
                    />
                  </Grid>                                   
                </Grid>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea dar de baja la Facturacion?
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
