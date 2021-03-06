import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MenuListItem from './MenuListItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel,faMoneyBillWave,faPlusSquare,faChartLine } from "@fortawesome/free-solid-svg-icons";

import logo from "../../Assets/Images/infinite-logo-small.png";
import theme from './Theme.js';
import Copyright from './Copyright.js';

import { 
  logOut, 
  esRolGerente, 
  esRolAdministrativo, 
  esRolProfesor 
} from '../../Services/sessionServices';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "background-color": "rgba(226, 227, 228, 0.4)",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    "background-color": "#5e7b4c",
    fontWeight: "bold"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    "background-color": "#d7f0cb",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "background-color": "#d7f0cb"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    "background-color": "#d7f0cb",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Layout = ({ children, title, refresh }) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer
          //variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <img src={logo} className="appLogoDark" alt="logo" width="150" />
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <MenuListItem text="Inicio" to="/" icon={<HomeIcon style={{ color: "#404040" }} />} />            
            {esRolAdministrativo() && <MenuListItem text="Pronostico" to="/RenewableEnergy" icon={<FontAwesomeIcon icon={faSolarPanel}style={{ color: "#404040" }}/>} />}
            {esRolAdministrativo() && <MenuListItem text="Mi Dia a Dia" to="/DiaADia" icon={<FontAwesomeIcon icon={faChartLine}style={{ color: "#404040" }}/>} />}
            {esRolAdministrativo() && <MenuListItem text="Consumo" to="/ConsumoManual" icon={<FontAwesomeIcon icon={faMoneyBillWave}style={{ color: "#404040" }}/>} />}
            {esRolAdministrativo() && <MenuListItem text="Estimados" to="/Estimados" icon={<FontAwesomeIcon icon={faMoneyBillWave}style={{ color: "#404040" }}/>} />}
            {esRolAdministrativo() && <MenuListItem text="Mi Pais" to="/Miscelaneo" icon={<FontAwesomeIcon icon={faPlusSquare}style={{ color: "#404040" }}/>} />}            
            {esRolAdministrativo() && <MenuListItem text="Infinitips" to="/Infinitips" icon={<FontAwesomeIcon icon={faPlusSquare}style={{ color: "#404040" }}/>} />}            
          </List>
          <Divider />
          <div style={{ position: "absolute", bottom: 0 }}>
          <List>
            {/* <MenuListItem text="Mis datos" to="/misDatos" icon={<AccountCircleIcon style={{ color: "#404040" }} />} /> */}
            <MenuListItem onClick={() => logOut() } text="Cerrar sesi??n" to="/" icon={<ExitToAppIcon style={{ color: "#404040" }} />} />
          </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default Layout;
