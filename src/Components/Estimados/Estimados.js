import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Layout from '../Layout/Layout.js';
import { listarEstimados } from '../../Services/estimadosServices';
import {getIdUser} from "../../Services/sessionServices";
import TabEstimados from "./TabEstimados.js";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { LoadingData } from '../Common';

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

export default function Estimados() {
    var idUsuario = getIdUser(); 
    useEffect(() => {
        document.title = "Infinite - Estimado"
    }, [])
    
    const classes = useStyles();
    const [tabIndex, setTabIndex] = React.useState(0);
    const [isLoadingEstimados, setIsLoadingEstimados] = React.useState(false); 
    const [estimados, setEstimado] = React.useState(null);

    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    const recargarEstimados = () => {

        setIsLoadingEstimados(true);
        console.log(idUsuario)
        listarEstimados(idUsuario)
        .then((response) => {      
            //console.log(response)
            setEstimado(response.status == 200 ? response.data : []);
            setIsLoadingEstimados(false);          
        })
        .catch(error => {
            setIsLoadingEstimados(false);
        });    
    }
    if (estimados === null && !isLoadingEstimados) {
        recargarEstimados();
    }
    return(
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
              <Tab className={classes.customTab} label="Gestión de Consumo" aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          
          <TabPanel value={tabIndex} index={0}>            
            {!isLoadingEstimados
                && estimados !== null
                && (
              <TabEstimados datos={estimados} recargarEstimadosEvent={recargarEstimados} IdUsuario={getIdUser()}/>
            )}
            
            { (isLoadingEstimados && 
              <LoadingData
                message="Cargando Consumos..."
                message2="Aguarde por favor."
              />
            )} 
          </TabPanel>
        </div>
      </Layout>
    </div>);
}