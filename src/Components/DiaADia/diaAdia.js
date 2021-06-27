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

import { listarConsumosAutomaticos } from '../../Services/consumoServices';

import {getIdUser} from "../../Services/sessionServices";

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

function tabProps(index) {
    return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabs-${index}`,
    };
}
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

export default function DiaAdia() {
  
    useEffect(() => {
      document.title = "Infinite - Dia a dia"
    }, [])
  
    const classes = useStyles();
    const [tabIndex, setTabIndex] = React.useState(0);
    const [isLoadingConsumo, setIsLoadingConsumo] = React.useState(false); 
    const [consumo, setConsumo] = React.useState(null);
  
    const handleChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };
    
    var idUsuario = getIdUser();    
    const recargarConsumo = () => {
  
      setIsLoadingConsumo(true);
      
      listarConsumosAutomaticos(idUsuario)
          .then((response) => {      
            //sleep(5);
            setConsumo(response.status == 200 ? response.data.sort((a,b)=>
            new Date(a.fechaYHora) - new Date(b.fechaYHora)
            ) : []);
            setIsLoadingConsumo(false);          
          })
          .catch(error => {
            setIsLoadingConsumo(false);
          });
      
    }
  
    if (consumo === null && !isLoadingConsumo) {
      recargarConsumo();
    }

    return (
        <div>
            <Layout title="Dia a dia">
                <div className={classes.root}>
                <AppBar position="static">
                    <StyledTabs
                    value={tabIndex}
                    onChange={handleChange}
                    variant="fullWidth"
                    className={classes.customTabs}
                    centered>
                    <Tab className={classes.customTab} label="Mi consumo" icon={<PaymentIcon />} aria-label="person" {...tabProps(0)} />
                    </StyledTabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0}>            
                    {!isLoadingConsumo
                        && consumo !== null
                        && (
                    <TabConsumo datos={consumo} recargarConsumoEvent={recargarConsumo} IdUsuario={getIdUser()}/>
                    )}
                    
                    { (isLoadingConsumo && 
                    <LoadingData
                        message="Cargando Consumos..."
                        message2="Aguarde por favor."
                    />
                    )} 
                </TabPanel>
                </div>
            </Layout>
        </div>
    )
}