import React, { useEffect ,useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Layout from '../Layout/Layout.js';
import { listarEstimados } from '../../Services/estimadosServices';
import {listarElectrodomestico} from '../../Services/electrodomesticosServices';
import {getIdUser} from "../../Services/sessionServices";
import TabEstimados from "./TabEstimados.js";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { LoadingData } from '../Common';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import Tour from './EstimadosTour'



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

    const [isLoadingElectrodomesticos, setIsLoadingElectrodomesticos] = React.useState(false); 
    const [electrodomesticos, setElectrodomesticos] = React.useState(null);
    const [tour_on, setTourON] = useState(false);

    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    const recargarEstimados = () => {

        setIsLoadingEstimados(true);
        console.log(idUsuario)
        listarEstimados(idUsuario)
        .then((response) => {      
            console.log(response)
            setEstimado(response.status == 200 ? response.data : []);
            setIsLoadingEstimados(false);          
        })
        .catch(error => {
            setIsLoadingEstimados(false);
        });    
    }
    const recargarElectrodomesticos = () => {
        setIsLoadingElectrodomesticos(true);
        console.log(idUsuario)
        listarElectrodomestico()
        .then((response) => {      
            //console.log(response)
            setElectrodomesticos(response.status == 200 ? response.data : []);
            console.log(response)
            setIsLoadingElectrodomesticos(false);          
        })
        .catch(error => {
            setIsLoadingElectrodomesticos(false);
        });    
    }
    if (estimados === null && !isLoadingEstimados) {
        recargarEstimados();
    }
    if (electrodomesticos === null && !isLoadingElectrodomesticos) {
      recargarElectrodomesticos();
    } 
    
    return(      
    <div>
        <Layout title="Estimado">
        <div className={classes.root}>
          <AppBar position="static">
          <Fab
        icon="?"
         onClick={() => setTourON(true)   }
        >
        </Fab>
        <Tour run={tour_on}/>

            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Estimado" aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>

          <TabPanel value={tabIndex} index={0} class="Estimados" >            
            {!isLoadingEstimados
                && estimados !== null
                && !isLoadingElectrodomesticos && electrodomesticos &&(
              <TabEstimados datos={estimados} electro={electrodomesticos} recargarEstimadosEvent={recargarEstimados} IdUsuario={getIdUser()} />
            )}

            { (isLoadingEstimados && 
              <LoadingData
                message="Calcular consumo estimados"
                message2="Aguarde por favor."

              />
            )} 
          </TabPanel>
        </div>
      </Layout>
    </div>);
}