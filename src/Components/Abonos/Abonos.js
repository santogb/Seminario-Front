import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Layout from '../Layout/Layout.js';
import TabTiposAbono from "./TabAbonos.js";

import { LoadingData } from '../Common';

import { listarTiposAbono } from '../../Services/tiposAbonoServices';

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

export default function Abonos() {
  
  useEffect(() => {
    document.title = "CityGym - Abonos"
  }, [])
  
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingTiposAbono, setIsLoadingTiposAbono] = React.useState(false);
  const [tiposAbono, setTiposAbono] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarTiposAbono = () => {

    setIsLoadingTiposAbono(true);

    listarTiposAbono()
      .then((response) => {
        setTiposAbono(response?.status === "OK" ? response.tiposAbono : []);
        setIsLoadingTiposAbono(false);
      })
      .catch(error => {
        setIsLoadingTiposAbono(false);
      });
  }

  if (tiposAbono === null && !isLoadingTiposAbono) {
    recargarTiposAbono();
  }

  return (
    <div>
      <Layout title="Abonos">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Gestión de Abonos" icon={<LocalAtmIcon />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>

            {!isLoadingTiposAbono && tiposAbono !== null && (
              <TabTiposAbono tiposAbono={tiposAbono} recargarTiposAbonoEvent={recargarTiposAbono} />
            )}
            
            {isLoadingTiposAbono && (
              <LoadingData
                message="Cargando tipos de abono..."
                message2="Aguarde por favor."
              />
            )} 

          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}