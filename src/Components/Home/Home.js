import React, { useEffect } from "react";
import Layout from '../Layout/Layout.js';
import "./Home.scss";
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment'
import 'moment/locale/es';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PaymentIcon from '@material-ui/icons/Payment';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ImageCO2 from "../../Assets/Images/co2-svgrepo-com.svg";
import ImageTree from "../../Assets/Images/Tree.png";
import ModalVideo from 'react-modal-video';
import "react-modal-video/scss/modal-video.scss";
//import GraficoComunidad from "./GraficoComunidad.js";
import GraficoComunidad from "./GraficoComunidad";
import { listarServiciosPorSemana } from '../../Services/serviciosServices';
import Tour from './HomeTour'

import Iframe from 'react-iframe';

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

const styleCountUpCO2 = {
  fontSize: 60,
  color: "#4b4d45",
  textAlign: "center",
}

const styleCountUpImprovePercent = {
  fontSize: 60,
  color: "#0aa817",
  textAlign: "center",
}

const styleCountUpTrees = {
  fontSize: 60,
  color: "#245a29",
  textAlign: "center",
}

const styleCard = {
  "margin-bottom": "20px",
  "margin-top": "20px",
}

const styleImageCO2 = {
  height: "200px",
  width: "200px",
}

const styleImageTree = {
  height: "200px",
  width: "200px",
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

export default function Home() {

  useEffect(() => {
    document.title = "Infinite - Inicio"
  }, [])

  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isOpen, setOpen] = React.useState(true)
  
  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div>
      <Layout title="Inicio">     
      <AppBar position="static">
        <ModalVideo channel='youtube' 
          youtube={{
            start: 5,
            end: 198,
          }}
          isOpen={isOpen} videoId="NAPAMIpGB-s" onClose={() => setOpen(false)} />
        <StyledTabs
          value={tabIndex}
          onChange={handleChange}
          variant="fullWidth"
          className={classes.customTabs}
          centered>
          <Tab 
          className={classes.customTab} 
          label="Tus Logros" icon={<PaymentIcon />} aria-label="person" {...tabProps(0)} />
        </StyledTabs>
      </AppBar>
      <Tour/>
        <Card style={styleCard}>
        <img src={ImageCO2} alt="Logo" className="logo" style={styleImageCO2} />
          <TabPanel value={tabIndex} index={0} class="Home-Consumo-CO">            
            <p style={styleCountUpCO2}> 
              <CountUp end={100} suffix={" kg de CO2"} delay="1"/>
            </p>
            <h1>Consumiste 100 kWh, lo que equivalen a 100kg de CO2</h1>

            <p style={styleCountUpImprovePercent}>
              <CountUp end={10} prefix={"^"} suffix={" %"} delay="3"/>
            </p>
            <h1>Consumiste 10kWh menos que el mes pasado, lo que equivale a un 10% menos.</h1>
          </TabPanel> 
          </Card>
        <Card style={styleCard} class="Home-Consumo-Arboles">
        <h1>Gracias a tu reducción de huella de carbono con respecto al mes anterior has salvado la vida de</h1> 
        <img src={ImageTree} alt="Logo" className="logo" style={styleImageTree} />
          <TabPanel value={tabIndex} index={0}>        
            <p style={styleCountUpTrees}>
              <CountUp end={10} suffix={" árboles"} delay="5"/>
            </p>
            <h1>Felicitaciones, seguí así!</h1>
          </TabPanel>
        </Card>
        <Card style={styleCard} class="Home-Consumo-Graph">
          <TabPanel value={tabIndex} index={0}>
            <GraficoComunidad/> 
          </TabPanel>
        </Card>  
      </Layout>
    </div>
  );
}
