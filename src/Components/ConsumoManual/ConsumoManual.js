import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PaymentIcon from '@material-ui/icons/Payment';
import Layout from '../Layout/Layout.js';
import TabConsumo from "./TabConsumo.js";

import { LoadingData } from '../Common';

import { listarConsumos } from '../../Services/consumoServices';

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

export default function ConsumosManuales() {
  
  useEffect(() => {
    document.title = "CityGym - Facturación"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingConsumo, setIsLoadingConsumo] = React.useState(false); 
  const [Consumo, setConsumo] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarConsumo = () => {

    setIsLoadingConsumo(true);

    listarConsumos()
      .then((response) => {
        setConsumo(response?.status === "OK" ? response.Consumoes : []);
        setIsLoadingConsumo(false);
      })
      .catch(error => {
        setIsLoadingConsumo(false);
      });
  }
/*
  if (Consumo === null && !isLoadingConsumo) {
    recargarConsumo();
  }*/

  return (
    <div>
      <Layout title="Consumo">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Gestión de Consumo y Cobros" icon={<PaymentIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingConsumo
                && Consumo !== null
                && (
              <TabConsumo Consumo={Consumo} recargarConsumoEvent={recargarConsumo} />
            )}
            
            { (isLoadingConsumo) && (
              <LoadingData
                message="Cargando Consumoes..."
                message2="Aguarde por favor."
              />
            )} 

          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}