import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Layout from '../Layout/Layout.js';
import {getIdUser} from "../../Services/sessionServices";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { LoadingData } from '../Common';
import Tips from "./tips";



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

export default function Infinitips() {
    var idUsuario = getIdUser(); 
    useEffect(() => {
        document.title = "Infinite - Tips"
    }, [])
    
    const classes = useStyles();
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    
    return(      
    <div>
        <Layout title="Infinitips">
        <div className={classes.root}>
          <AppBar position="static">
            <StyledTabs
              value={tabIndex}
              onChange={handleChange}
              variant="fullWidth"
              className={classes.customTabs}
              centered>
              <Tab className={classes.customTab} label="Tips" aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          
          <TabPanel value={tabIndex} index={0}>            
            <Tips/>
          </TabPanel>
        </div>
      </Layout>
    </div>);
}