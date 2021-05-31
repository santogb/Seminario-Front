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
import InfoIcon from '@material-ui/icons/Info';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ModalSocio from './ModalSocio';
import ModalAbono from './ModalAbono';

import { validateRequired } from "../Common/Validations";
import { formatDateWithTimeToString, formatStringToDate, formatDateToString, addDays } from "../Common/DateHelpers";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearSocio, editarSocio, eliminarSocio } from "../../Services/sociosServices";
import { esRolAdministrativo } from "../../Services/sessionServices";

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

export default class TabSocios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      isModalOpen: false,
      isModalAbonoOpen: false,
      isSaving: false,
      modalABM: "",
      messageModal: null,
      form: this.initializeForm(),
      formAbono: this.initializeFormAbono(),
      validations: this.initializeValidations(),
      validationsAbono: this.initializeValidationsAbono(),
      validationMessages: this.initializeValidationMessages(),
      validationMessagesAbono: this.initializeValidationMessagesAbono(),
    };
  }

  initializeForm = () => {
    return {
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      fechaNacimiento: "",
      domicilio: "",
      localidad: "",
      telefono: "",
      obraSocial: "",
      nroSocio: "",
      telefonoEmergencia: "",
      contactoEmergencia: "",
      grupoSanguineo: "",
      esFumador: false,
      esCardiaco: false,
      esAlergico: false,
      esAsmatico: false,
      observacionAlergia: "",
      observacionAsma: "",
      aptoFisico: false,
      fechaAptoFisico: "",
    };
  };

  initializeValidations = () => {
    return {
      nombre: true,
      apellido: true,
      email: true,
      dni: true,
      fechaNacimiento: true,
      domicilio: true,
      localidad: true,
      telefono: true,
      obraSocial: true,
      nroSocio: true,
      telefonoEmergencia: true,
      contactoEmergencia: true,
      grupoSanguineo: true,
      esFumador: true,
      esCardiaco: true,
      esAlergico: true,
      esAsmatico: true,
      observacionAlergia: true,
      observacionAsma: true,
      aptoFisico: true,
      fechaAptoFisico: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      fechaNacimiento: "",
      domicilio: "",
      localidad: "",
      telefono: "",
      obraSocial: "",
      nroSocio: "",
      telefonoEmergencia: "",
      contactoEmergencia: "",
      grupoSanguineo: "",
      esFumador: "",
      esCardiaco: "",
      esAlergico: "",
      esAsmatico: "",
      observacionAlergia: "",
      observacionAsma: "",
      aptoFisico: "",
      fechaAptoFisico: "",
    };
  };

  initializeFormAbono = () => {
    return {
      idSocio: "",
      idTipoAbono: null,
      cantDias: 0,
      fechaInicio: "",
    };
  };

  initializeValidationsAbono = () => {
    return {
      idSocio: true,
      idTipoAbono: true,
      fechaInicio: true,
    };
  };

  initializeValidationMessagesAbono = () => {
    return {
      idSocio: "",
      idTipoAbono: "",
      fechaInicio: "",
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

  handleChangeAbono = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      formAbono: {
        ...prevState.formAbono,
        [prop]: value,
      },
      validationsAbono: {
        ...prevState.validationsAbono,
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

  handleABM = (method, socio) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: socio?.id ?? 0,
        nombre: socio?.nombre ?? "",
        apellido: socio?.apellido ?? "",
        dni: socio?.dni,
        email: socio?.email ?? "",
        fechaNacimiento:
          formatDateWithTimeToString(socio?.fechaNacimiento) ?? "",
        domicilio: socio?.domicilio ?? "",
        localidad: socio?.localidad ?? "",
        telefono: socio?.telefono ?? "",
        obraSocial: socio?.obraSocial ?? "",
        nroSocio: socio?.nroSocio ?? "",
        telefonoEmergencia: socio?.telefonoEmergencia ?? "",
        contactoEmergencia: socio?.contactoEmergencia ?? "",
        grupoSanguineo: socio?.grupoSanguineo ?? "",
        esFumador: socio?.esFumador ?? false,
        esCardiaco: socio?.esCardiaco ?? false,
        esAlergico: socio?.esAlergico ?? false,
        esAsmatico: socio?.esAsmatico ?? false,
        observacionAlergia: socio?.observacionAlergia ?? "",
        observacionAsma: socio?.observacionAsma ?? "",
        aptoFisico: socio?.aptoFisico ?? false,
        fechaAptoFisico:
          formatDateWithTimeToString(socio?.fechaAptoFisico) ?? "",
      },
    }));
  };

  handleABMAbono = (socio) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalAbonoOpen: true,
      formAbono: {
        ...prevState.formAbono,
        idSocio: socio?.id ?? 0,
        idTipoAbono: socio?.abono?.idTipoAbono ?? null,
        cantDias: socio?.abono?.tipoAbono?.cantDias ?? 0,
        fechaInicio: formatDateWithTimeToString(socio?.abono?.fechaDesde) ?? "",
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleEdicion = (socio) => this.handleABM("M", socio);
  handleBaja = (socio) => this.handleABM("B", socio);
  handleDetalle = (socio) => this.handleABM("D", socio);
  handleAltaAbono = (socio) => this.handleABMAbono(socio);

  validateForm = async () => {
    var isNombreValid = await validateRequired(this.state.form.nombre);
    var isApellidoValid = await validateRequired(this.state.form.apellido);
    var isDniValid = await validateRequired(this.state.form.dni);
    var isEmailValid = await validateRequired(this.state.form.email);
    var isFechaNacimientoValid = await validateRequired(
      this.state.form.fechaNacimiento
    );
    var isTelefonoEmergenciaValid = await validateRequired(
      this.state.form.telefonoEmergencia
    );
    var isContactoEmergenciaValid = await validateRequired(
      this.state.form.contactoEmergencia
    );
    var isGrupoSanguineoValid = await validateRequired(
      this.state.form.grupoSanguineo
    );

    var nombreValidationMessage = "El Nombre es requerido...";
    var apellidoValidationMessage = "El Apellido es requerido...";
    var dniValidationMessage = "El DNI es requerido...";
    var emailValidationMessage = "El Email es requerido...";
    var fechaNacimientoValidationMessage =
      "La fecha de nacimiento es requerida...";
    var telefonoEmergenciaValidationMessage =
      "El teléfono de emergencia es requerido...";
    var contactoEmergenciaValidationMessage =
      "El contacto de emergencia es requerido...";
    var grupoSanguineoValidationMessage = "El grupo sanguineo es requerido...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        nombre: isNombreValid,
        apellido: isApellidoValid,
        dni: isDniValid,
        email: isEmailValid,
        fechaNacimiento: isFechaNacimientoValid,
        telefonoEmergencia: isTelefonoEmergenciaValid,
        contactoEmergencia: isContactoEmergenciaValid,
        grupoSanguineo: isGrupoSanguineoValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        nombre: nombreValidationMessage,
        apellido: apellidoValidationMessage,
        dni: dniValidationMessage,
        email: emailValidationMessage,
        fechaNacimiento: fechaNacimientoValidationMessage,
        telefonoEmergencia: telefonoEmergenciaValidationMessage,
        contactoEmergencia: contactoEmergenciaValidationMessage,
        grupoSanguineo: grupoSanguineoValidationMessage,
      },
    }));

    return (
      isNombreValid &&
      isApellidoValid &&
      isDniValid &&
      isEmailValid &&
      isFechaNacimientoValid &&
      isTelefonoEmergenciaValid &&
      isContactoEmergenciaValid &&
      isGrupoSanguineoValid
    );
  };

  validateFormAbono = async () => {
    var isIdTipoAbonoValid = await validateRequired(
      this.state.formAbono.idTipoAbono
    );
    var isFechaInicioValid = await validateRequired(
      this.state.formAbono.fechaInicio
    );

    var idTipoAbonoValidationMessage = "El Tipo de Abono es requerido...";
    var fechaInicioValidationMessage = "La fecha de inicio es requerida...";

    this.setState((prevState) => ({
      ...prevState,
      validationsAbono: {
        ...prevState.validationsAbono,
        idTipoAbono: isIdTipoAbonoValid,
        fechaInicio: isFechaInicioValid,
      },
      validationMessagesAbono: {
        ...prevState.validationMessagesAbono,
        idTipoAbono: idTipoAbonoValidationMessage,
        fechaInicio: fechaInicioValidationMessage,
      },
    }));

    return isIdTipoAbonoValid && isFechaInicioValid;
  };

  handleGuardar = async () => {
    const isValidForm = await this.validateForm();

    if (isValidForm && !this.state.isSaving) {
      this.setState((prevState) => ({
        ...prevState,
        isSaving: true,
      }));

      var fechaAptoFisico = null;
      var today = new Date();

      if (this.state.form?.aptoFisico ?? false) {
        fechaAptoFisico = formatDateToString(today);
      }

      var request = {
        id: this.state.form.id,
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        email: this.state.form.email,
        dni: this.state.form.dni,
        fechaNacimiento: this.state.form.fechaNacimiento,
        domicilio: this.state.form.domicilio,
        localidad: this.state.form.localidad,
        telefono: this.state.form.telefono,
        obraSocial: this.state.form.obraSocial,
        nroSocio: this.state.form.nroSocio,
        telefonoEmergencia: this.state.form.telefonoEmergencia,
        contactoEmergencia: this.state.form.contactoEmergencia,
        grupoSanguineo: this.state.form.grupoSanguineo,
        esFumador: this.state.form.esFumador,
        esCardiaco: this.state.form.esCardiaco,
        esAlergico: this.state.form.esAlergico,
        esAsmatico: this.state.form.esAsmatico,
        observacionAlergia: this.state.form.observacionAlergia,
        observacionAsma: this.state.form.observacionAsma,
        aptoFisico: this.state.form.aptoFisico,
        fechaAptoFisico: fechaAptoFisico,
      };

      if (this.state.modalABM === "A") {
        crearSocio(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      } else if (this.state.modalABM === "M") {
        editarSocio(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      }
    }
  };

  handleGuardarAbono = async () => {

    const isValidForm = await this.validateFormAbono();

    if (isValidForm && !this.state.isSaving) {
      this.setState((prevState) => ({
        ...prevState,
        isSaving: true,
      }));

      var fechaHasta = formatStringToDate(this.state.formAbono.fechaInicio);
      addDays(fechaHasta, this.state.formAbono.cantDias);

      var request = {
        idSocio: this.state.formAbono.idSocio,
        idTipoAbono: this.state.formAbono.idTipoAbono,
        fechaDesde: this.state.formAbono.fechaInicio,
        fechaHasta: formatDateToString(fechaHasta),
      };

      crearAbono(request)
        .then((response) => {
          this.onGuardarAbonoResponseOk(response);
        })
        .catch((error) => {
          this.onGuardarAbonoResponseError(error);
        });
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
          " de socio exitosa!",
        message:
          this.state.modalABM === "A"
            ? "El socio fue dado de alta correctamente."
            : "El socio fue actualizado correctamente.",
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
          " de socio errónea :(",
        message:
          "Oops! Ocurrió un error al " +
          (this.state.modalABM === "A" ? "dar de alta" : "editar") +
          " el socio.",
      },
    }));
  };

  onGuardarAbonoResponseOk = (response) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalAbonoOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: true,
        isError: false,
        title: "¡Asignación de abono exitosa!",
        message: "El abono del socio fue asignado fue correctamente.",
      },
      formAbono: this.initializeFormAbono(),
      validationsAbono: this.initializeValidationsAbono(),
      validationMessagesAbono: this.initializeValidationMessagesAbono(),
    }));
  };

  onGuardarAbonoResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Asignación de abono errónea :(",
        message: "Oops! Ocurrió un error al asignar el abono del socio.",
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarSocio(this.state.form.id)
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
        title: "¡Baja de socio exitosa!",
        message: "El socio fue eliminado correctamente.",
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
        title: "Baja de socio errónea",
        message: "Oops! Ocurrió un error al eliminar el socio.",
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

  handleCerrarAbono = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalAbonoOpen: false,
      formAbono: this.initializeFormAbono(),
      validationsAbono: this.initializeValidationsAbono(),
      validationMessagesAbono: this.initializeValidationMessagesAbono(),
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
    this.props.recargarSociosEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.socios != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.socios.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var sociosPaginado =
      this.props.socios != null
        ? this.props.socios?.slice(
            this.state.page * rowsPerPage,
            this.state.page * rowsPerPage + rowsPerPage
          )
        : [];

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Socio" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Apellido</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>DNI</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sociosPaginado?.map((socio) => (
                <StyledTableRow key={socio.id}>
                  <StyledTableCell>{socio?.apellido ?? "-"}</StyledTableCell>
                  <StyledTableCell>{socio?.nombre ?? "-"}</StyledTableCell>
                  <StyledTableCell>{socio?.dni ?? "-"}</StyledTableCell>
                  <StyledTableCell>{socio?.email ?? "-"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <InfoIcon
                      onClick={() => this.handleDetalle(socio)}
                      variant="contained"
                      style={{
                        margin: "0 5px",
                        cursor: "pointer",
                        color: "#404040",
                      }}
                    />
                    {esRolAdministrativo() && (
                      <EditIcon
                        onClick={() => this.handleEdicion(socio)}
                        variant="contained"
                        style={{
                          margin: "0 5px",
                          cursor: "pointer",
                          color: "#404040",
                        }}
                      />
                    )}
                    {esRolAdministrativo() && (
                      <DeleteIcon
                        onClick={() => this.handleBaja(socio)}
                        style={{
                          margin: "0 5px",
                          cursor: "pointer",
                          color: "#404040",
                        }}
                      />
                    )}
                    {esRolAdministrativo() && (
                      <LocalAtmIcon
                        onClick={() => this.handleAltaAbono(socio)}
                        style={{
                          margin: "0 5px",
                          cursor: "pointer",
                          color: "#404040",
                        }}
                      />
                    )}
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
                  count={this.props.socios?.length ?? 0}
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

        <ModalSocio
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

        <ModalAbono
          isOpen={this.state.isModalAbonoOpen}
          isSaving={this.state.isSaving}
          form={this.state.formAbono}
          tiposAbono={this.props.tiposAbono}
          validations={this.state.validationsAbono}
          validationMessages={this.state.validationMessagesAbono}
          handleGuardar={this.handleGuardarAbono}
          handleCerrar={this.handleCerrarAbono}
          handleChange={this.handleChangeAbono}
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
