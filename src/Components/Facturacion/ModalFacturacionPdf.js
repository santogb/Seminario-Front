import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PostPdf from "./Recibo/PostPdf";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function ModalFacturacionPdf(props) {
  const classes = useStyles();
  
  return (
    <div>
      <Dialog fullWidth={true} maxWidth={"md"} open={props.isOpenPdf} onClose={props.handleCerrar} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <MuiDialogTitle disableTypography id="alert-dialog-title">
          <p></p>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleCerrar}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogActions>
          <PostPdf
            tipoPago={props?.form?.tipoPago}
            cuotas={props?.form?.cuotas}
            numeroRecibo={props?.form?.numeroRecibo}
            fecha={props?.form?.fecha}
            fechaHoy={props?.form?.fechaHoy}
            apellido={props?.form?.apellido}
            nombre={props?.form?.nombre}
            dni={props?.form?.dni}
            tipoAbono={props?.form?.tipoAbono}           
            monto={props?.form?.monto}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
