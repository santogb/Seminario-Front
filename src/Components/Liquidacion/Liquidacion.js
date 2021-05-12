import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Layout from '../Layout/Layout.js';
import TabLiquidacion from "./TabLiquidacion.js";

import { LoadingData } from '../Common';

import { listarLiquidaciones } from '../../Services/liquidacionServices';
import { listarTiposPago } from '../../Services/tiposServices';

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

export default function Liquidacion() {
  
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingLiquidacion, setIsLoadingLiquidacion] = React.useState(false);
  const [isLoadingTiposPago, setIsLoadingTiposPago] = React.useState(false);
  const [liquidacion, setLiquidacion] = React.useState(null);
  const [tiposPago, setTiposPago] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarLiquidacion = () => {

    setIsLoadingLiquidacion(true);

    listarLiquidaciones()
      .then((response) => {
        setLiquidacion(response?.status === "OK" ? response.liquidaciones : []);
        setIsLoadingLiquidacion(false);
      })
      .catch(error => {
        setIsLoadingLiquidacion(false);
      });
  }

  const recargarTiposPago = () => {

    setIsLoadingTiposPago(true);

    listarTiposPago()
      .then((response) => {
        setTiposPago(response?.status === "OK" ? response.tiposPago : []);
        setIsLoadingTiposPago(false);
      })
      .catch(error => {
        setIsLoadingTiposPago(false);        
      });
  }

  if (liquidacion === null && !isLoadingLiquidacion) {
    recargarLiquidacion();
  }

  if (tiposPago === null && !isLoadingTiposPago) {
    recargarTiposPago();
  }

  return (
    <div>
      <Layout title="Liquidaciones">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Gestión de Liquidacion de Sueldos" icon={<AccountBalanceIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingLiquidacion && liquidacion !== null && !isLoadingTiposPago && tiposPago !== null && (
              <TabLiquidacion liquidacion={liquidacion} tiposPago={tiposPago} recargarLiquidacionEvent={recargarLiquidacion} />
            )}
            
            { (isLoadingLiquidacion || isLoadingTiposPago) && (
              <LoadingData
                message="Cargando liquidaciones..."
                message2="Aguarde por favor."
              />
            )} 

          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
