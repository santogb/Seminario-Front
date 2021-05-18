import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Layout from '../Layout/Layout.js';
import TabMisDatos from "./TabMisDatos.js";

import { LoadingData } from '../Common';

import { getIdUser } from '../../Services/sessionServices';
import { obtenerEmpleado } from '../../Services/empleadosServices';

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

export default function MisDatos() {
  
  useEffect(() => {
    document.title = "CityGym - MisDatos"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingMisDatos, setIsLoadingMisDatos] = React.useState(false);
  const [misDatos, setMisDatos] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarMisDatos = () => {

    setIsLoadingMisDatos(true);

    obtenerEmpleado(getIdUser())
      .then((response) => {
        setMisDatos(response?.empleado);
        setIsLoadingMisDatos(false);
      })
      .catch(error => {
        setIsLoadingMisDatos(false);
      });
  }

  if (misDatos === null && !isLoadingMisDatos) {
    recargarMisDatos();
  }

  return (
  <div>
      <Layout title="Mis Datos">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} icon={<AccountCircleIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingMisDatos && misDatos !== null && (
              <TabMisDatos data={misDatos} recargarMisDatosEvent={recargarMisDatos} />
            )}

            {isLoadingMisDatos && (
              <LoadingData
                message="Cargando tus datos..."
                message2="Aguarde por favor."
              />
            )} 

          </TabPanel>
        </div>
      </Layout>
    </div>);
}
