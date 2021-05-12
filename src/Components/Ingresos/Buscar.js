import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TrafficLight from 'react-trafficlight';
import Alert from '@material-ui/lab/Alert';
import { Container } from "@material-ui/core";
import {  Textbox, CustomButton } from "../Common";

export default function Buscar(props) {

  return (
    <Paper
                style={{ display: "flex", flexDirection: "column", spacing: 2 }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  style={{
                    padding: "10px 0 10px 0",
                    margin: 0,
                    backgroundColor: "#055A8B",
                    color: "#FFFFFF",
                  }}
                >
                  Buscar
                </Typography>

                <Container style={{ padding: 20 }}>
                  <Grid container spacing={2}>
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Textbox
                        propName="dni"
                        placeholder="DNI"
                        value={props.form?.dni ?? ""}
                        handleChange={props.handleChange}
                        isValid={props.validations.dni}
                        isNumber
                        validationMessage={props.validationMessages.dni}
                      />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <CustomButton
                        isLoading={props.isBuscando}
                        handleClick={props.handleBuscarEmpleado}
                        text="Buscar Empleado"
                        loadingText="Buscando"
                        isFullWidth
                      />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <CustomButton
                        isLoading={props.isBuscando}
                        handleClick={props.handleBuscarSocio}
                        text="Buscar Socio"
                        loadingText="Buscando"
                        isFullWidth
                      />
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12} container>
                      <Grid item xl={12} lg={12} md={12} xs={12}>
                        <Textbox
                          placeholder="Nombre"
                          value={props.form?.nombre ?? ""}
                          isDisabled
                        />
                      </Grid>
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        xs={12}
                        style={{ paddingTop: 20 }}
                      >
                        <Textbox
                          placeholder="Apellido"
                          value={props.form?.apellido ?? ""}
                          isDisabled
                        />
                      </Grid>
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        xs={12}
                        style={{ paddingTop: 20 }}
                      >
                        <Textbox
                          propName="estadoPago"
                          placeholder="Estado de Pago"
                          value={props.form?.estadoPago ?? ""}
                          isDisabled
                        />
                      </Grid>
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        xs={12}
                        style={{ paddingTop: 20 }}
                      >
                        <Textbox
                          propName="fechaAptoFisico"
                          placeholder="Fecha Apto Físico"
                          value={props.form?.fechaAptoFisico ?? ""}
                          isDisabled
                          isDate
                        />
                      </Grid>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12} container>
                    <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        xs={12}
                      >
                        <CustomButton
                        isDisabled={!props.isSuccessIngreso}
                        handleClick={props.handleMarcarIngreso}
                        text="Marcar Ingreso"
                        isFullWidth
                      />
                      </Grid>
                    <Grid item xl={12} lg={12} md={12} xs={12}>
                      <Container style={{ textAlign: "center" }}>
                        <TrafficLight 
                          RedOn={props.isErrorIngreso}
                          YellowOn={props.isWarningIngreso}
                          GreenOn={props.isSuccessIngreso} />
                      </Container>
                      </Grid>
                    </Grid>
                  </Grid>
                  {(props.isErrorIngreso || props.isWarningIngreso) && 
                  <Grid item xl={12} lg={12} md={12} xs={12} style={{ paddingTop: 20 }}>
                    <Alert style={{ marginBottom: 10, fontSize: 18 }} severity={props.isErrorIngreso ? "error" : "warning"}>
                      {props.mensajeIngreso}
                    </Alert>
                  </Grid>}
                </Container>
              </Paper>
  );
}
