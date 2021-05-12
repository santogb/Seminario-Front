import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Layout from '../Layout/Layout.js';
import TabSocios from "./TabSocios.js";

import { LoadingData } from '../Common';
import { listarSocios } from '../../Services/sociosServices';
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

export default function Socios() {
  
  useEffect(() => {
    document.title = "CityGym - Socios"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingSocios, setIsLoadingSocios] = React.useState(false);
  const [isLoadingTiposAbono, setIsLoadingTiposAbono] = React.useState(false);
  const [socios, setSocios] = React.useState(null);
  const [tiposAbono, setTiposAbono] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarSocios = () => {

    setIsLoadingSocios(true);

    listarSocios()
      .then((response) => {
        setSocios(response?.status === "OK" ? response.socios : []);
        setIsLoadingSocios(false);
      })
      .catch(error => {
        setIsLoadingSocios(false);
      });
  }

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

  if (socios === null && !isLoadingSocios) {
    recargarSocios();
  }

  if (tiposAbono === null && !isLoadingTiposAbono) {
    recargarTiposAbono();
  }

  return (
    <div>
      <Layout title="Socios">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered
            >
              <Tab
                className={classes.customTab}
                label="Gestión de Socios"
                icon={<AssignmentIndIcon />}
                aria-label="person"
                {...tabProps(0)}
              />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            {!isLoadingSocios && !isLoadingTiposAbono && socios !== null && tiposAbono !== null && (
              <TabSocios
                socios={socios}
                tiposAbono={tiposAbono}
                recargarSociosEvent={recargarSocios}
              />
            )}

            {isLoadingSocios && (
              <LoadingData
                message="Cargando socios..."
                message2="Aguarde por favor."
              />
            )}
          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
