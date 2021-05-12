import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Layout from '../Layout/Layout.js';
import TabServicios from "./TabServicios.js";

import { LoadingData } from '../Common';

import { listarServicios } from '../../Services/serviciosServices';
import { listarTiposServicio } from '../../Services/tiposServices';
import { listarEmpleados } from '../../Services/empleadosServices';

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
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  customTabs: {
    backgroundColor: '#404040',
  }
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

export default function Servicios() {
  
  useEffect(() => {
    document.title = "CityGym - Servicios"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingServicios, setIsLoadingServicios] = React.useState(false);
  const [isLoadingTiposServicio, setIsLoadingTiposServicio] = React.useState(false);
  const [isLoadingEmpleados, setIsLoadingEmpleados] = React.useState(false);
  const [servicios, setServicios] = React.useState(null);
  const [empleados, setEmpleados] = React.useState(null);
  const [tiposServicio, setTiposServicio] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarServicios = () => {

    setIsLoadingServicios(true); 

    listarServicios()
      .then((response) => {
        setServicios(response?.status === "OK" ? response.servicios : []);
        setIsLoadingServicios(false);
      })
      .catch(error => {
        setIsLoadingServicios(false);
      });
  }

  const recargarTiposServicio = () => {

    setIsLoadingTiposServicio(true);

    listarTiposServicio()
      .then((response) => {
        setTiposServicio(response?.status === "OK" ? response.tiposServicio : []);
        setIsLoadingTiposServicio(false);
      })
      .catch(error => {
        setIsLoadingTiposServicio(false);
      });
  }

  const recargarEmpleados = () => {

    setIsLoadingEmpleados(true);

    listarEmpleados(1)
      .then((response) => {
        setEmpleados(response?.status === "OK" ? response.empleados : []);
        setIsLoadingEmpleados(false);
      })
      .catch(error => {
        setIsLoadingEmpleados(false);
      });
  }

  if (servicios === null && !isLoadingServicios) {
    recargarServicios();
  }

  if (tiposServicio === null && !isLoadingTiposServicio) {
    recargarTiposServicio();
  }

  if (empleados === null && !isLoadingEmpleados) {
    recargarEmpleados();
  }

  return (
    <div>
      <Layout title="Servicios">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Gestión de Servicios" icon={<AssignmentIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingServicios && !isLoadingTiposServicio && !isLoadingEmpleados && servicios !== null && tiposServicio !== null && empleados !== null && (
              <TabServicios servicios={servicios} tiposServicio={tiposServicio} empleados={empleados} recargarServiciosEvent={recargarServicios} />
            )}
            {(isLoadingServicios || isLoadingTiposServicio || isLoadingEmpleados) && (
              <LoadingData
                message="Cargando servicios..."
                message2="Aguarde por favor."
              />
            )} 
          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
