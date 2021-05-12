import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalServicio from './ModalServicio';

import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearServicio, editarServicio, eliminarServicio } from "../../Services/serviciosServices";

const ButtonNuevoContainer = styled(Container)({
  textAlign: 'right',
  padding: 0
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#055A8B",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default class TabServicios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      isModalOpen: false,
      isSaving: false,
      modalABM: "",
      messageModal: null,
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    };
  }

  initializeForm = () => {
    return {
      idTipoServicio: null,
      idEmpleado: null,
      horarioMañana: false,
      horarioTarde: false,
      horarioNoche: false,
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
      cantHorasDia: 0,
      tipoServicio: "",
    };
  };

  initializeValidations = () => {
    return {
      idTipoServicio: true,
      idEmpleado: true,
      cantHorasDia: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      idTipoServicio: "",
      idEmpleado: "",
      horarioMañana: "",
      horarioTarde: "",
      horarioNoche: "",
      lunes: "",
      martes: "",
      miercoles: "",
      jueves: "",
      viernes: "",
      sabado: "",
      domingo: "",
      cantHorasDia: "",
    };
  };

  handleChange = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [prop]: value,
      },
      valitations: {
        ...prevState.validations,
        [prop]: true,
      },
    }));
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleABM = (method, servicio) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: servicio?.id ?? 0,
        idTipoServicio: servicio?.idTipoServicio ?? "",
        tipoServicio: servicio?.tipo?.tipoServicio ?? "",
        idEmpleado: servicio?.idEmpleado ?? "",
        horarioMañana: servicio?.horarioMañana ?? false,
        horarioTarde: servicio?.horarioTarde ?? false,
        horarioNoche: servicio?.horarioNoche ?? false,
        lunes: servicio?.lunes ?? false,
        martes: servicio?.martes ?? false,
        miercoles: servicio?.miercoles ?? false,
        jueves: servicio?.jueves ?? false,
        viernes: servicio?.viernes ?? false,
        sabado: servicio?.sabado ?? false,
        domingo: servicio?.domingo ?? false,
        cantHorasDia: servicio?.cantHorasDia ?? 0,
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleEdicion = (servicio) => this.handleABM("M", servicio);
  handleBaja = (servicio) => this.handleABM("B", servicio);

  validateForm = async () => {
    var isIdTipoServicioValid = await validateRequired(
      this.state.form.idTipoServicio
    );
    var isIdEmpleadoValid = await validateRequired(this.state.form.idEmpleado);
    var isCantHorasDiaValid = await validateRequired(
      this.state.form.cantHorasDia
    );

    var idTipoServicioValidationMessage = "El Tipo de Servicio es requerido...";
    var idEmpleadoValidationMessage = "El Empleado es requerido...";
    var cantHorasValidationMessage = "Las Hs/Día son requeridas...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        idTipoServicio: isIdTipoServicioValid,
        idEmpleado: isIdEmpleadoValid,
        cantHorasDia: isCantHorasDiaValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        idTipoServicio: idTipoServicioValidationMessage,
        idEmpleado: idEmpleadoValidationMessage,
        cantHorasDia: cantHorasValidationMessage,
      },
    }));

    return isIdTipoServicioValid && isIdEmpleadoValid && isCantHorasDiaValid;
  };

  handleGuardar = async () => {
    const isValidForm = await this.validateForm();

    if (isValidForm && !this.state.isSaving) {
      this.setState((prevState) => ({
        ...prevState,
        isSaving: true,
      }));

      var request = {
        id: this.state.form.id,
        idTipoServicio: this.state.form.idTipoServicio,
        idEmpleado: this.state.form.idEmpleado,
        horarioMañana: this.state.form.horarioMañana,
        horarioTarde: this.state.form.horarioTarde,
        horarioNoche: this.state.form.horarioNoche,
        lunes: this.state.form.lunes,
        martes: this.state.form.martes,
        miercoles: this.state.form.miercoles,
        jueves: this.state.form.jueves,
        viernes: this.state.form.viernes,
        sabado: this.state.form.sabado,
        domingo: this.state.form.domingo,
        cantHorasDia: this.state.form.cantHorasDia,
      };

      if (this.state.modalABM === "A") {
        crearServicio(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      } else if (this.state.modalABM === "M") {
        editarServicio(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      }
    }
  };

  onGuardarResponseOk = (response) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: true,
        isError: false,
        title:
          "¡" +
          (this.state.modalABM === "A" ? "Alta" : "Edición") +
          " de servicio exitosa!",
        message:
          this.state.modalABM === "A"
            ? "El servicio fue dado de alta correctamente."
            : "El servicio fue actualizado correctamente.",
      },
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    }));
  };

  onGuardarResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title:
          (this.state.modalABM === "A" ? "Alta" : "Edición") +
          " de servicio errónea :(",
        message:
          "Oops! Ocurrió un error al " +
          (this.state.modalABM === "A" ? "dar de alta" : "editar") +
          " el servicio.",
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarServicio(this.state.form.id)
      .then((response) => {
        this.onEliminarResponseOk(response);
      })
      .catch((error) => {
        this.onEliminarResponseError(error);
      });
  };

  onEliminarResponseOk = (response) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: true,
        isError: false,
        title: "¡Baja de servicio exitosa!",
        message: "El servicio fue eliminado correctamente.",
      },
    }));
  };

  onEliminarResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Baja de servicio errónea",
        message: "Oops! Ocurrió un error al eliminar el servicio.",
      },
    }));
  };

  handleCerrar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    }));
  };

  cerrarMessageModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      messageModal: {
        ...prevState.messageModal,
        isOpen: false,
      },
    }));
  };

  handleAceptarMessageModal = () => {
    this.cerrarMessageModal();
    this.props.recargarServiciosEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.servicios != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.servicios.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var serviciosPaginado = this.props.servicios?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Servicio" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Servicio</StyledTableCell>
                <StyledTableCell>Profesor</StyledTableCell>
                <StyledTableCell align="center">Mañana</StyledTableCell>
                <StyledTableCell align="center">Tarde</StyledTableCell>
                <StyledTableCell>Noche</StyledTableCell>
                <StyledTableCell align="center">Lu</StyledTableCell>
                <StyledTableCell align="center">Ma</StyledTableCell>
                <StyledTableCell align="center">Mié</StyledTableCell>
                <StyledTableCell align="center">Jue</StyledTableCell>
                <StyledTableCell align="center">Vie</StyledTableCell>
                <StyledTableCell align="center">Sáb</StyledTableCell>
                <StyledTableCell align="center">Dom</StyledTableCell>
                <StyledTableCell align="center">Hs / Clase</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviciosPaginado.map((servicio) => (
                <StyledTableRow key={servicio.id}>
                  <StyledTableCell align="center">
                    {servicio?.tipo?.tipoServicio ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {(servicio.empleado?.apellido ?? "-") +
                      ", " +
                      (servicio.empleado?.nombre ?? "-")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.horarioMañana ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.horarioTarde ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.horarioNoche ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.lunes ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.martes ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.miercoles ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.jueves ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.viernes ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.sabado ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.domingo ? "Si" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {servicio?.cantHorasDia}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      onClick={() => this.handleEdicion(servicio)}
                      variant="contained"
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => this.handleBaja(servicio)}
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={14}
                  count={this.props.servicios.length}
                  rowsPerPage={rowsPerPage}
                  page={this.state.page}
                  SelectProps={{
                    inputProps: { "aria-label": "Filas por página" },
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  rowsPerPageOptions={[rowsPerPage]}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <ModalServicio
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}
          form={this.state.form}
          tiposServicio={this.props.tiposServicio}
          empleados={this.props.empleados}
          validations={this.state.validations}
          validationMessages={this.state.validationMessages}
          handleGuardar={this.handleGuardar}
          handleEliminar={this.handleEliminar}
          handleCerrar={this.handleCerrar}
          handleChange={this.handleChange}
        />

        <MessageModal
          isOpen={this.state.messageModal?.isOpen}
          isLoading={this.state.messageModal?.isLoading}
          title={this.state.messageModal?.title}
          message={this.state.messageModal?.message}
          isSuccess={this.state.messageModal?.isSuccess}
          isError={this.state.messageModal?.isError}
          handleSuccess={this.handleAceptarMessageModal}
          handleError={this.handleCerrarMessageModal}
          handleClose={this.handleCerrarMessageModal}
        />
      </div>
    );
  }
}
