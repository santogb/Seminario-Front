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
import ModalEmpleado from './ModalEmpleado';

import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearEmpleado, editarEmpleado, eliminarEmpleado } from "../../Services/empleadosServices";

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

export default class TabEmpleados extends React.Component {
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
      nombre: "",
      apellido: "",
      dni: null,
      idTipoEmpleado: null,
      email: "",
      password: "",
      sueldoBase: "",
      sueldoHora: "",
    };
  };

  initializeValidations = () => {
    return {
      nombre: true,
      apellido: true,
      dni: true,
      idTipoEmpleado: true,
      email: true,
      password: true,
      sueldoBase: true,
      sueldoHora: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      nombre: "",
      apellido: "",
      dni: "",
      idTipoEmpleado: "",
      email: "",
      password: "",
      sueldoBase: "",
      sueldoHora: "",
    };
  };

  handleChange = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [prop]: value,
      },
      validations: {
        ...prevState.validations,
        [prop]: true,
      },
    }));
  };

  handleChangePage = (event, newPage) => {
    this.setState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  handleABM = (method, empleado) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: empleado?.id ?? 0,
        nombre: empleado?.nombre ?? "",
        apellido: empleado?.apellido ?? "",
        dni: empleado?.dni,
        idTipoEmpleado: empleado?.tipo?.id,
        email: empleado?.email ?? "",
        password: empleado?.password ?? "",
        sueldoBase: empleado?.sueldoBase ?? "",
        sueldoHora: empleado?.sueldoHora ?? "",
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleEdicion = (empleado) => this.handleABM("M", empleado);
  handleBaja = (empleado) => this.handleABM("B", empleado);

  validateForm = async () => {
    var isNombreValid = await validateRequired(this.state.form.nombre);
    var isApellidoValid = await validateRequired(this.state.form.apellido);
    var isDniValid = await validateRequired(this.state.form.dni);
    var isTipoEmpleadoValid = await validateRequired(
      this.state.form.idTipoEmpleado
    );
    var isEmailValid = await validateRequired(this.state.form.email);
    var isPasswordValid =
      this.state.modalABM !== "M"
        ? await validateRequired(this.state.form.password)
        : true;

    var nombreValidationMessage = "El Nombre es requerido...";
    var apellidoValidationMessage = "El Apellido es requerido...";
    var dniValidationMessage = "El DNI es requerido...";
    var tipoEmpleadoValidationMessage = "El Tipo de Empleado es requerido...";
    var emailValidationMessage = "El Email es requerido...";
    var passwordValidationMessage = "El Password es requerido...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        nombre: isNombreValid,
        apellido: isApellidoValid,
        dni: isDniValid,
        idTipoEmpleado: isTipoEmpleadoValid,
        email: isEmailValid,
        password: isPasswordValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        nombre: nombreValidationMessage,
        apellido: apellidoValidationMessage,
        dni: dniValidationMessage,
        idTipoEmpleado: tipoEmpleadoValidationMessage,
        email: emailValidationMessage,
        password: passwordValidationMessage,
      },
    }));

    return (
      isNombreValid &&
      isApellidoValid &&
      isDniValid &&
      isTipoEmpleadoValid &&
      isEmailValid &&
      isPasswordValid
    );
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
        idTipoEmpleado: this.state.form.idTipoEmpleado,
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        email: this.state.form.email,
        password: this.state.form.password,
        dni: this.state.form.dni,
        sueldoBase: parseFloat(this.state.form.sueldoBase),
        sueldoHora: parseFloat(this.state.form.sueldoHora),
        estado: true,
      };

      if (this.state.modalABM === "A") {
        crearEmpleado(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      } else if (this.state.modalABM === "M") {
        editarEmpleado(request)
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
          " de empleado exitosa!",
        message:
          this.state.modalABM === "A"
            ? "El empleado fue dado de alta correctamente."
            : "El empleado fue actualizado correctamente.",
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
          " de empleado errónea :(",
        message:
          "Oops! Ocurrió un error al " +
          (this.state.modalABM === "A" ? "dar de alta" : "editar") +
          " el empleado.",
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarEmpleado(this.state.form.id)
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
        title: "¡Baja de empleado exitosa!",
        message: "El empleado fue eliminado correctamente.",
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
        title: "Baja de empleado errónea",
        message: "Oops! Ocurrió un error al eliminar el empleado.",
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
    this.props.recargarEmpleadosEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.empleados != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.empleados.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var empleadosPaginado = this.props.empleados?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Empleado" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Apellido</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>DNI</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="center">Tipo</StyledTableCell>
                <StyledTableCell align="center">Sueldo Base</StyledTableCell>
                <StyledTableCell align="center">Sueldo Hora</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleadosPaginado?.map((empleado) => (
                <StyledTableRow key={empleado.id}>
                  <StyledTableCell>{empleado?.apellido ?? "-"}</StyledTableCell>
                  <StyledTableCell>{empleado?.nombre ?? "-"}</StyledTableCell>
                  <StyledTableCell>{empleado?.dni ?? "-"}</StyledTableCell>
                  <StyledTableCell>{empleado?.email ?? "-"}</StyledTableCell>
                  <StyledTableCell align="center">
                    {empleado?.tipo?.tipoEmpleado ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{empleado?.sueldoBase ?? "-"}</StyledTableCell>
                  <StyledTableCell align="center">{empleado?.sueldoHora ?? "-"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      onClick={() => this.handleEdicion(empleado)}
                      variant="contained"
                      style={{
                        margin: "0 5px",
                        cursor: "pointer",
                        color: "#404040",
                      }}
                    />
                    <DeleteIcon
                      onClick={() => this.handleBaja(empleado)}
                      style={{
                        margin: "0 5px",
                        cursor: "pointer",
                        color: "#404040",
                      }}
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
                  colSpan={6}
                  count={this.props.empleados?.length ?? 0}
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

        <ModalEmpleado
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}
          form={this.state.form}
          tiposEmpleado={this.props.tiposEmpleado}
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
