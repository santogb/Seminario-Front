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

const ddlCuotas = [
  { cuotas: "1" },
  { cuotas: "3" },
  { cuotas: "6" },
  { cuotas: "12" },
];

export default function ModalFacturacion(props) {
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
              {props.modalABM === "A" && <span>Alta de Facturacion</span>}
              {props.modalABM === "B" && <span>Baja de Facturacion</span>}
              {props.modalABM === "M" && <span>Edición de Facturacion</span>}
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
                        isLoading={props.isBuscandoSocio}
                        handleClick={props.handleBuscarSocio}
                        text="Buscar"
                        loadingText="Buscando"
                        isFullWidth
                    />
                  </Grid>

                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="Nombre"
                      placeholder="Nombre"
                      value={props.form.nombre}
                      isDisabled
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
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                  <Dropdown
                      propName="idTipoPago"
                      placeholder="Tipo Pago"
                      value={props.form.idTipoPago}
                      handleChange={props.handleChangeTipoPago}
                      isValid={props.validations.idTipoPago}
                      validationMessage={
                        props.validationMessages.idTipoPago
                      }
                      options={props.tiposPago}
                      optionValueProp="id"
                      optionTextProp="tipoPago"
                    />
                  </Grid>
                  {props.form.idTipoPago === 2 && <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="nroTarjeta"
                      placeholder="Nro. Tarjeta"
                      value={props.form.nroTarjeta}
                      handleChange={props.handleChange}
                      isValid={props.validations.nroTarjeta}
                      validationMessage={props.validationMessages.nroTarjeta}
                    />
                  </Grid> }
                  {props.form.idTipoPago === 2 && <Grid item xl={6} lg={6} md={12} xs={12}>
                    <Textbox
                      propName="titular"
                      placeholder="Titular"
                      value={props.form.titular}
                      handleChange={props.handleChange}
                      isValid={props.validations.titular}
                      validationMessage={props.validationMessages.titular}
                    />
                  </Grid> }
                  {props.form.idTipoPago === 2 && <Grid item xl={6} lg={6} md={12} xs={12}>
                  <Dropdown
                      propName="cuotas"
                      placeholder="Cant. Cuotas"
                      value={props.form.cuotas}
                      handleChange={props.handleChange}
                      isValid={props.validations.cuotas}
                      validationMessage={
                        props.validationMessages.cuotas
                      }
                      options={ddlCuotas}
                      optionValueProp="cuotas"
                      optionTextProp="cuotas"
                    />
                  </Grid> }
                  {props.form.idTipoPago === 2 && <Grid item xl={6} lg={6} md={12} xs={12}>
                    <Textbox
                      propName="ccv"
                      placeholder="CCV"
                      value={props.form.ccv}
                      handleChange={props.handleChange}
                      isValid={props.validations.ccv}
                      validationMessage={props.validationMessages.ccv}
                      isNumber
                    />
                  </Grid> }
                  {props.form.idTipoPago === 2 && <Grid item xl={6} lg={6} md={12} xs={12}>
                    <Textbox
                      propName="fechaVencTarjeta"
                      placeholder="F. Vencimiento"
                      value={props.form.fechaVencTarjeta}
                      handleChange={props.handleChange}
                      isValid={props.validations.fechaVencTarjeta}
                      validationMessage={props.validationMessages.fechaVencTarjeta}
                      isMonth
                    />
                  </Grid> }
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
