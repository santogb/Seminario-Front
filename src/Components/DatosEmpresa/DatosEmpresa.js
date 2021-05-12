import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Layout from '../Layout/Layout.js';
import TabDatosEmpresa from "./TabDatosEmpresa.js";

import { LoadingData } from '../Common';

import { listarDatosEmpresa } from '../../Services/datosEmpresaServices';

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

export default function DatosEmpresa() {
  
  useEffect(() => {
    document.title = "CityGym - Datos Empresa"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingDatos, setIsLoadingDatos] = React.useState(false);
  const [datos, setDatos] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarDatosEmpresa = () => {

    setIsLoadingDatos(true);

    listarDatosEmpresa()
      .then((response) => {
        setDatos(response.datosEmpresa[0]);
        setIsLoadingDatos(false);
      })
      .catch(error => {
        setIsLoadingDatos(false);
      });
  }

  if (datos === null && !isLoadingDatos) {
    recargarDatosEmpresa();
  }

  return (
  <div>
      <Layout title="Datos Empresa">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} icon={<ApartmentIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingDatos && datos !== null && (
              <TabDatosEmpresa data={datos} recargarDatosEmpresaEvent={recargarDatosEmpresa} />
            )}

            {isLoadingDatos && (
              <LoadingData
                message="Cargando datos de la empresa..."
                message2="Aguarde por favor."
              />
            )} 

          </TabPanel>
        </div>
      </Layout>
    </div>);
}
