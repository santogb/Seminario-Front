import React, { useEffect ,useState} from "react";
import Layout from '../Layout/Layout.js';
import "./Home.scss";
import 'react-week-calendar/dist/style.css';
import 'moment/locale/es';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import PaymentIcon from '@material-ui/icons/Payment';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Card from '@material-ui/core/Card';
import ImageCO2 from "../../Assets/Images/co2-svgrepo-com.svg";
import ImageTree from "../../Assets/Images/Tree.png";
import ModalVideo from 'react-modal-video';
import "react-modal-video/scss/modal-video.scss";
import GraficoComunidad from "./GraficoComunidad";
import { useHistory } from "react-router-dom";
import EcoIcon from '@material-ui/icons/Eco';
import Tour from './HomeTour'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getFirstShow,setFirstShow,removeFirstShow} from "../../Services/sessionServices";

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

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
const styleCardContainer = {
  "margin-top":"40px"
}
const styleCountUpCO2 = {
  fontSize: 40,
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
  // "max-width": "600px",
  "margin-bottom": "20px",
  "margin-top": "20px",
  "min-height": "400px",
}

const styleImageCO2 = {
  height: "80px",
  width: "80px",
}

const styleContainer = {
  "max-height": "1000px",
}

const styleImageTree = {
  height: "80px",
  width: "80px",
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
  const [isOpen, setOpen] = React.useState(getFirstShow());
  const [tour_on, setTourON] = useState(false);

  const closeVideo = () =>{
    setFirstShow(false);
    setOpen(false);
    console.log(getFirstShow())
    console.log(getFirstShow())
  };

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const history = useHistory()

  const handleClick = (e) => {
    history.push("/Infinitips") 
  };

  return (
          <div>
        <Layout title="Inicio"  style={styleContainer}>
        <Badge badgeContent={1} style={{padding: 5}} color="primary" onClick={ handleClick}>
                <EcoIcon fontSize="large" />
              </Badge>
              
        <AppBar position="static"> 
          {console.log('getFirstShow',getFirstShow())} 
          {console.log('isOpen',isOpen)}
        <Fab
        icon="?"
        alwaysShowTitle={true}>
           <Action
          text="Ayuda"
          onClick={() => setTourON(true)   }
          children={<HelpOutlineIcon />}          />
          <Action
          text="Ver Video"
          onClick={()=> setOpen(true)}
          children={<VideoLibraryIcon />}        />
        </Fab>

          {console.log(getFirstShow())} 
          {console.log(isOpen)}
               
            <ModalVideo channel='youtube' 
              youtube={{
                start: 5,
                end: 198,
              }}
              isOpen={isOpen} videoId="NAPAMIpGB-s" onClose={() => {
                removeFirstShow();
                setOpen(false);
                console.log('getFirstShow/isOpen afterclose',isOpen,getFirstShow());
                }
              } />

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
              <Tour run={tour_on} />
        <Container>
          <Row>
            <Col xs="6">
              <Card style={styleCard}>
                <div style={styleCardContainer}>
                  <TabPanel value={tabIndex} index={0} class="Home-Consumo-CO"> 
                    <h4>Consumiste 378 kWh, lo que equivalen a </h4> 
                    <p style={styleCountUpCO2}> 
                      <CountUp end={154.98} suffix={" kg de " } delay="1"/>
                      <img src={ImageCO2} alt="Logo" className="logo" style={styleImageCO2} />
                    </p>
                    <p style={styleCountUpImprovePercent}>
                      <CountUp end={10} prefix={"???"} suffix={" %" } delay="3"/>
                    </p>
                    <h4>Consumiste 42kWh menos que el mes pasado, lo que equivale a un 10% menos.</h4>
                  
                  </TabPanel> 
                </div>
              </Card>
            </Col>
            <Col xs="6">
              <Card style={styleCard} >
                <div style={styleCardContainer}>
                  <h4>Gracias a tu reducci??n de huella de carbono con respecto al mes anterior has salvado la vida de</h4> 
                  <img src={ImageTree} alt="Logo" className="logo" style={styleImageTree} />
                  <TabPanel value={tabIndex} index={0} class="Home-Consumo-Arboles">        
                    <p style={styleCountUpImprovePercent}>
                      <CountUp end={0.798} suffix={" ??rboles"} delay="5" decimals={2} decimal=","/>
                    </p>
                    <h4>Felicitaciones, segu?? as??!</h4>
                  </TabPanel>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <Card style={styleCard} class="Home-Consumo-Graph">
          <TabPanel value={tabIndex} index={0}>
            <GraficoComunidad/> 
          </TabPanel>
        </Card>  
      </Layout>
    </div>
  );
}
