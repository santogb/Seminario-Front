import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PeopleIcon from "@material-ui/icons/People";
import Layout from "../Layout/Layout.js";
import TabEmpleados from "./TabEmpleados.js";

import { LoadingData } from "../Common";

import { listarEmpleados } from "../../Services/empleadosServices";
import { listarTiposEmpleado } from "../../Services/tiposServices";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabs-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  customTabs: {
    backgroundColor: "#404040",
  },
}));

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#238fcf",
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
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

export default function Empleados() {
  
  useEffect(() => {
    document.title = "CityGym - Empleados"
  }, [])
  
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoadingEmpleados, setIsLoadingEmpleados] = React.useState(false);
  const [isLoadingTiposEmpleado, setIsLoadingTiposEmpleado] = React.useState(
    false
  );
  const [empleados, setEmpleados] = React.useState(null);
  const [tiposEmpleado, setTiposEmpleado] = React.useState(null);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const recargarEmpleados = () => {
    setIsLoadingEmpleados(true);

    listarEmpleados()
      .then((response) => {
        setEmpleados(response?.status === "OK" ? response.empleados : []);
        setIsLoadingEmpleados(false);
      })
      .catch((error) => {
        setIsLoadingEmpleados(false);
      });
  };

  const recargarTiposEmpleado = () => {
    setIsLoadingTiposEmpleado(true);

    listarTiposEmpleado()
      .then((response) => {
        setTiposEmpleado(response?.status === "OK" ? response.tiposEmpleado : []);
        setIsLoadingTiposEmpleado(false);
      })
      .catch((error) => {
        setIsLoadingTiposEmpleado(false);
      });
  };

  if (empleados === null && !isLoadingEmpleados) {
    recargarEmpleados();
  }

  if (tiposEmpleado === null && !isLoadingTiposEmpleado) {
    recargarTiposEmpleado();
  }

  return (
    <div>
      <Layout title="Empleados">
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
                label="Gestión de Empleados"
                icon={<PeopleIcon />}
                aria-label="person"
                {...tabProps(0)}
              />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            {!isLoadingEmpleados &&
              !isLoadingTiposEmpleado &&
              empleados !== null &&
              tiposEmpleado !== null && (
                <TabEmpleados
                  empleados={empleados}
                  tiposEmpleado={tiposEmpleado}
                  recargarEmpleadosEvent={recargarEmpleados}
                />
              )}

            {(isLoadingEmpleados || isLoadingTiposEmpleado) && (
              <LoadingData
                message="Cargando empleados..."
                message2="Aguarde por favor."
              />
            )}
          </TabPanel>
        </div>
      </Layout>
    </div>
  );
}
