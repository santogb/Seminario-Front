import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import { CustomButton } from "../Common";
import ModalSocioDatosPersonales from './ModalSocioDatosPersonales';
import ModalSocioDatosContacto from './ModalSocioDatosContacto';
import ModalSocioDatosMedicos from './ModalSocioDatosMedicos';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabs-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#238fcf',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabs-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}>
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

export default function ModalSocio(props) {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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
              {props.modalABM === "A" && <span>Alta de Socio</span>}
              {props.modalABM === "B" && <span>Baja de Socio</span>}
              {props.modalABM === "M" && <span>Edición de Socio</span>}
              {props.modalABM === "D" && <span>Detalle de Socio</span>}
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
              {(props.modalABM === "A" || props.modalABM === "M" || props.modalABM === "D") && (<div>
                <AppBar position="static">
                  <StyledTabs
                    value={tabIndex}
                    onChange={handleChangeTab}
                    variant="fullWidth"
                    className={classes.customTabs}
                    centered>
                    <Tab className={classes.customTab} label="Datos Personales" icon={<DirectionsRunIcon />} aria-label="person" {...tabProps(0)} />
                    <Tab className={classes.customTab} label="Datos Contacto" icon={<ImportContactsIcon />} aria-label="person" {...tabProps(1)} />
                    <Tab className={classes.customTab} label="Datos Médicos" icon={<LocalHospitalIcon />} aria-label="person" {...tabProps(2)} />
                  </StyledTabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>
                  <ModalSocioDatosPersonales 
                    modalABM={props.modalABM}
                    form={props.form}
                    validations={props.validations}
                    validationMessages={props.validationMessages}
                    handleChange={props.handleChange}
                  />
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <ModalSocioDatosContacto 
                    modalABM={props.modalABM}
                    form={props.form}
                    validations={props.validations}
                    validationMessages={props.validationMessages}
                    handleChange={props.handleChange}
                  />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                  <ModalSocioDatosMedicos 
                    modalABM={props.modalABM}
                    form={props.form}
                    validations={props.validations}
                    validationMessages={props.validationMessages}
                    handleChange={props.handleChange}
                  />
                </TabPanel>
                </div>
              )}
              {props.modalABM === "B" && (
                <p>
                  ¿Está seguro de que desea eliminar al empleado '
                  {props.form?.apellido + ", " + props.form?.nombre}'?
                </p>
              )}
            </form>
          </DialogContent>
          
          {props.modalABM !== "D" &&
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
          </DialogActions>}
        </Dialog>
      )}
    </div>
  );
}
