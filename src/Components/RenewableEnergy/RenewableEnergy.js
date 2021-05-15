import React, { useEffect }  from 'react'
import Iframe from 'react-iframe'


import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Layout from '../Layout/Layout.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel } from "@fortawesome/free-solid-svg-icons";

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

  function tabProps(index) {
    return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabs-${index}`,
    };
  }
function RenewableEnergy() {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
      };
    const classes = useStyles();
    return (
        <div>
      <Layout title="RenewableEnergy">
        <div>
          <AppBar position="static">
            <StyledTabs
                value={tabIndex}
                onChange={handleChange}
                variant="fullWidth"
                className={classes.customTabs}
                centered>
              <Tab label="Produccion Energia Renovable" icon={<FontAwesomeIcon icon={faSolarPanel} />} aria-label="person" {...tabProps(0)} />
            </StyledTabs>
          </AppBar>
          <Iframe url="https://cdsrenovables.cammesa.com/renovableschart/#/totalesLineAndPie"
                    width="100%"
                    height="2000px"
                    id="RenewableEnergy"
                    className="RenewableEnergy"
                    display="initial"
                    position="relative"/>
        </div>
      </Layout>
    </div>
    )
}
export default RenewableEnergy


