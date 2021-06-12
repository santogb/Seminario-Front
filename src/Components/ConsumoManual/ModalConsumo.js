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
import "../Common/DatePickerStyle.scss";
import Moment from 'moment'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { usePhotoGallery} from '../../hooks/usePhotoGallery';



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
  const { deletePhoto, photos, takePhoto } = usePhotoGallery({PropName:"photo",handleChange:props.handleOCR});  
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
                  <Textbox
                      propName="Periodo"
                      placeholder="Periodo"
                      value={props.form.Periodo}
                      handleChange={props.handleChange}                      
                      isMonth
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Textbox
                      propName="kwh"
                      placeholder="Kwh ($)"
                      value={props.form.kwh} 
                      handleChange={props.handleChange}                     
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={12} xs={12}>
                    <Textbox
                      propName="ConsumoTotal"
                      placeholder="Consumo Total"
                      value={props.form.ConsumoTotal}
                      handleChange={props.handleChange}                      
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={12} xs={12}>
                    <IonFab horizontal="right">
                      <IonFabButton onClick={() => {
                          takePhoto({PropName:"photo"});                           
                        } } >
                        <IonIcon icon={camera}></IonIcon>
                      </IonFabButton>
                    </IonFab>
                  </Grid> 
                  <Grid item xl={6} lg={6} md={12} xs={12}>                  
                  </Grid>
                </Grid>                                
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea dar de baja el Consumo?
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
