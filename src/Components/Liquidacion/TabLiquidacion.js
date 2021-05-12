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
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import ModalLiquidacion from './ModalLiquidacion';
import ModalLiquidacionEmpleados from './ModalLiquidacionEmpleados';
import ModalLiquidacionPdf from './ModalLiquidacionPdf';

import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { getMonthFromStringDate, getYearFromStringDate } from '../Common/DateHelpers';
import { crearLiquidacion, eliminarLiquidacion, liquidarEmpleados } from "../../Services/liquidacionServices";
import { obtenerEmpleadoPorDni } from "../../Services/empleadosServices";

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

export default class TabLiquidacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      isModalOpen: false,
      isModalOpenPDF: false,
      isModalOpenEmpleados: false,
      isSaving: false,
      modalABM: "",
      modalIMP: "",
      messageModal: null,
      form: this.initializeForm(),
      formEmpleados: this.initializeFormEmpleados(),
      formPDF: this.initializeFormPDF(),
      validations: this.initializeValidations(),
      validationsEmpleados: this.initializeValidationsEmpleados(),
      validationMessages: this.initializeValidationMessages(),
      validationMessagesEmpleados: this.initializeValidationMessagesEmpleados(),
    };
  }

  initializeForm = () => {
    return {
      idTipoPago: "",
      fechaLiquidacion: "",
      idEmpleado: "",
      sueldoBase: "",
      sueldoHora: "",
      dni: "",
    };
  };

  initializeValidations = () => {
    return {
      idTipoPago: true,
      fechaLiquidacion: true,
      idEmpleado: true,
      sueldoBase: true,
      sueldoHora: true,
      dni: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      idTipoPago: "",
      fechaLiquidacion: "",
      idEmpleado: "",
      sueldoBase: "",
      sueldoHora: "",
      dni: "",
    };
  };

  initializeFormEmpleados = () => {
    return {
      idTipoPago: "",
      fechaLiquidacion: "",
    };
  };

  initializeValidationsEmpleados = () => {
    return {
      idTipoPago: true,
      fechaLiquidacion: true,
    };
  };

  initializeValidationMessagesEmpleados = () => {
    return {
      idTipoPago: "",
      fechaLiquidacion: "",
    };
  };

  initializeFormPDF = () => {
    return {
      empleado: "",
      dni: "",
      sueldoBase: "",
      monto: "",
      montoHoras: "",
      montoJubilacion: "",
      montoSalud: "",
      montoLey19032: "",
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

  handleChangeEmpleados = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      formEmpleados: {
        ...prevState.formEmpleados,
        [prop]: value,
      },
      
      validationsEmpleados: {
        ...prevState.validationsEmpleados,
        [prop]: true,
      },
    }));
  };

  handleChangeDni = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [prop]: value,
        idEmpleado: "",
        nombre: "",
        sueldoBase: "",
        sueldoHora: "",
      },
      validations: {
        ...prevState.validations,
        [prop]: true,
        idEmpleado: true,
        sueldoBase: true,
        sueldoHora: true,
      },
    }));
  };

  handleChangePage = (event, newPage) => {
    this.setState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  handleABM = (method, liquidacion) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: liquidacion?.id ?? 0,
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleBaja = (liquidacion) => this.handleABM("B", liquidacion);
  handleImprimirReciboEmpleado = (liquidacion) => this.handleIMP("I", liquidacion);

  handleIMP = (method, liquidacion) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpenPDF: true,
      modalIMP: method,
      formPDF: {
        ...prevState.formPDF,
        empleado: liquidacion?.empleado?.apellido + ', ' + liquidacion?.empleado?.nombre,
        legajo: liquidacion?.dni,
        tipoEmpleado: liquidacion?.empleado?.tipo?.tipoEmpleado,
        dni: liquidacion?.empleado?.dni,
        sueldoBase: liquidacion?.empleado?.sueldoBase,
        monto: liquidacion?.monto,
        montoHoras: liquidacion?.montoHoras,
        montoJubilacion: liquidacion?.montoJubilacion,
        montoSalud: liquidacion?.montoSalud,
        montoLey19032: liquidacion?.montoLey19032,
        mes: liquidacion?.mes,
        anio: liquidacion?.anio,
        fecha: "01/" + liquidacion?.mes + "/" + liquidacion?.anio
      },
    }));
  };

  handleLiquidar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpenEmpleados: true
    }));
  }

  validateForm = async () => {

    var isIdTipoPagoValid = await validateRequired(this.state.form.idTipoPago);
    var isFechaLiquidacionValid = await validateRequired(this.state.form.fechaLiquidacion);
    var isIdEmpleadoValid = await validateRequired(this.state.form.idEmpleado);
    var isSueldoBaseValid = await validateRequired(this.state.form.sueldoBase);
    var isDniValid = await validateRequired(this.state.form.dni);

    var idTipoPagoValidationMessage = "El Tipo de Pago es requerido...";
    var fechaLiquidacionValidationMessage = "La fecha de liquidacion  no existe...";
    var idEmpleadoValidationMessage = "El empleado no existe...";
    var sueldoBaseValidationMessage = "El empleado no tiene cargado un sueldo base...";
    var dniValidationMessage = "El DNI es requerido...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        idTipoPago: isIdTipoPagoValid,
        idEmpleado: isIdEmpleadoValid,
        fechaLiquidacion: isFechaLiquidacionValid,
        sueldoBase: isSueldoBaseValid,
        dni: isDniValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        idTipoPago: idTipoPagoValidationMessage,
        idEmpleado: idEmpleadoValidationMessage,
        fechaLiquidacion: fechaLiquidacionValidationMessage,
        sueldoBase: sueldoBaseValidationMessage,
        dni: dniValidationMessage,
      },
    }));

    return isIdTipoPagoValid && isIdEmpleadoValid && isFechaLiquidacionValid && isSueldoBaseValid && isDniValid;
  };

  validateFormEmpleados = async () => {

    var isIdTipoPagoValid = await validateRequired(this.state.formEmpleados.idTipoPago);
    var isFechaLiquidacionValid = await validateRequired(this.state.formEmpleados.fechaLiquidacion);

    var idTipoPagoValidationMessage = "El Tipo de Pago es requerido...";
    var fechaLiquidacionValidationMessage = "La fecha de liquidacion  no existe...";

    this.setState((prevState) => ({
      ...prevState,
      validationsEmpleados: {
        ...prevState.validationsEmpleados,
        idTipoPago: isIdTipoPagoValid,
        fechaLiquidacion: isFechaLiquidacionValid,
      },
      validationMessagesEmpleados: {
        ...prevState.validationMessagesEmpleados,
        idTipoPago: idTipoPagoValidationMessage,
        fechaLiquidacion: fechaLiquidacionValidationMessage,
      },
    }));

    return isIdTipoPagoValid && isFechaLiquidacionValid;
  };

  validateEmpleadoForm = async () => {
    var isDniValid = await validateRequired(this.state.form.dni);

    var dniValidationMessage = "Debe ingresar un DNI";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        dni: isDniValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        dni: dniValidationMessage,
      },
    }));

    return isDniValid;
  };

  handleBuscarEmpleado = async () => {
    const isValidForm = await this.validateEmpleadoForm();

    if (isValidForm && !this.state.isBuscandoEmpleado) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoEmpleado: true,
        form: {
          ...prevState.form,
          idEmpleado: "",
          nombre: "",
        },
      }));

      obtenerEmpleadoPorDni(this.state.form.dni)
        .then((response) => {
          this.onBuscarEmpleadoResponseOk(response?.empleado);
        })
        .catch((error) => {
          this.onBuscarEmpleadoResponseError(error);
        });
    }
  };

  onBuscarEmpleadoResponseOk = (response) => {
    if (response) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoEmpleado: false,
        form: {
          ...prevState.form,
          idEmpleado: response?.id ?? "",
          nombre: response?.apellido
            ? response?.apellido + ", " + (response?.nombre ?? "")
            : "",
          sueldoBase: response?.sueldoBase,
          sueldoHora: response?.sueldoHora,
        },
        validations: this.initializeValidations(),
        validationMessages: this.initializeValidationMessages(),
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoEmpleado: false,
        form: this.initializeForm(),
        messageModal: {
          ...prevState.messageModal,
          isOpen: true,
          isSuccess: false,
          isError: true,
          title: "Búsqueda de Empleado",
          message:
            "No se encontró ningún Empleado con el DNI '" +
            this.state.form.dni +
            "'",
        },
      }));
    }
  };

  onBuscarEmpleadoResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isBuscandoEmpleado: false,
      form: this.initializeForm(),
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Búsqueda de Empleado",
        message: "Oops! Ocurrió un error al buscar el Empleado.",
      },
    }));
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
        idTipoPago: this.state.form.idTipoPago,
        anio: getYearFromStringDate(this.state.form.fechaLiquidacion),
        mes: getMonthFromStringDate(this.state.form.fechaLiquidacion),
        idEmpleado: this.state.form.idEmpleado,
        monto: this.state.form.monto,
      };

      crearLiquidacion(request)
        .then((response) => {
          this.onGuardarResponseOk(response);
        })
        .catch((error) => {
          this.onGuardarResponseError(error);
        });
    }
  };

  handleLiquidarEmleados = async () => {
    const isValidForm = await this.validateFormEmpleados();

    if (isValidForm && !this.state.isSaving) {
      this.setState((prevState) => ({
        ...prevState,
        isSaving: true,
      }));

      var request = {
        idTipoPago: this.state.formEmpleados.idTipoPago,
        anio: getYearFromStringDate(this.state.formEmpleados.fechaLiquidacion),
        mes: getMonthFromStringDate(this.state.formEmpleados.fechaLiquidacion),
      };

      liquidarEmpleados(request)
        .then((response) => {
          this.onLiquidarEmpleadosResponseOk(response);
        })
        .catch((error) => {
          this.onLiquidarEmpleadosResponseError(error);
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
        title: "Alta de liquidacion exitosa!",
        message: "La liquidacion fue dado de alta correctamente. " + response?.message
      },
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    }));
  };

  onLiquidarEmpleadosResponseOk = (response) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpenEmpleados: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: true,
        isError: false,
        title: "La Liquidacion de empleados fue exitosa!",
        message: "La liquidacion fue procesada correctamente.",
        messages: response?.messages
      },
      formEmpleados: this.initializeFormEmpleados(),
      validationsEmpleados: this.initializeValidationsEmpleados(),
      validationMessagesEmpleados: this.initializeValidationMessagesEmpleados(),
    }));
  };

  onGuardarResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title:
          (this.state.modalABM === "A" ? "Alta" : "Edición") +
          " de La liquidacion fue errónea :(",
        message:
          "Oops! Ocurrió un error al " +
          (this.state.modalABM === "A" ? "dar de alta" : "editar") +
          " La liquidacion.",
      },
    }));
  };

  onLiquidarEmpleadosResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpenEmpleados: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "La Liquidacion de empleados fue errónea :(",
        message: "Oops! Ocurrió un error al procesar la liquidación.",
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarLiquidacion(this.state.form.id)
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
          title: "¡Baja de La liquidacion exitosa!",
          message: "La liquidacion fue eliminado correctamente.",
        },
      }));
  };

  onEliminarResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Baja de La liquidacion errónea",
        message: "Oops! Ocurrió un error al eliminar La liquidacion.",
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

  handleCerrarLiquidacion = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpenEmpleados: false,
      formEmpleados: this.initializeFormEmpleados(),
      validationsEmpleados: this.initializeValidationsEmpleados(),
      validationMessagesEmpleados: this.initializeValidationMessagesEmpleados(),
    }));
  };

  handleCerrarPDF = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpenPDF: false,
      formPDF: this.initializeFormPDF()
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
    this.props.recargarLiquidacionEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.liquidacion != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.liquidacion.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var liquidacionPaginado = this.props.liquidacion?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleLiquidar} style={{ marginRight: 10 }} text="Liquidar Empleados" />
          <CustomButton handleClick={this.handleAlta} text="Nueva Liquidación" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Empleado</StyledTableCell>
                <StyledTableCell align="center">Fecha Liquidacion</StyledTableCell>
                <StyledTableCell align="center">Tipo Pago</StyledTableCell>
                <StyledTableCell align="center">Monto</StyledTableCell>
                <StyledTableCell align="center">Estado</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liquidacionPaginado?.map((liquidacion) => (
                <StyledTableRow key={liquidacion.id}>
                  <StyledTableCell>
                    {liquidacion?.empleado?.apellido + ", " + 
                     liquidacion?.empleado?.nombre ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {liquidacion?.anio + "/" + 
                     liquidacion?.mes?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {liquidacion?.tipoPago?.tipoPago ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {liquidacion?.monto ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {liquidacion?.estadoPago?.estadoPago ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <PrintIcon
                      onClick={() => this.handleImprimirReciboEmpleado(liquidacion)}
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => this.handleBaja(liquidacion)}
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
                  colSpan={6}
                  count={this.props.liquidacion?.length ?? 0}
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

        <ModalLiquidacion
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}
          form={this.state.form}
          liquidacion={this.props.liquidacion}
          tiposPago={this.props.tiposPago}
          validations={this.state.validations}
          validationMessages={this.state.validationMessages}
          handleGuardar={this.handleGuardar}
          handleEliminar={this.handleEliminar}
          handleCerrar={this.handleCerrar}
          handleChange={this.handleChange}
          handleChangeDni={this.handleChangeDni}
          handleBuscarEmpleado={this.handleBuscarEmpleado}
        />

        <ModalLiquidacionEmpleados
          isOpen={this.state.isModalOpenEmpleados}
          isSaving={this.state.isSaving}
          form={this.state.formEmpleados}
          tiposPago={this.props.tiposPago}
          validations={this.state.validationsEmpleados}
          validationMessages={this.state.validationMessagesEmpleados}
          handleLiquidar={this.handleLiquidarEmleados}
          handleCerrar={this.handleCerrarLiquidacion}
          handleChange={this.handleChangeEmpleados}
        />
        
        <ModalLiquidacionPdf
          isOpenPdf={this.state.isModalOpenPDF}
          form={this.state.formPDF}
          handleCerrar={this.handleCerrarPDF}
        />

        <MessageModal
          isOpen={this.state.messageModal?.isOpen}
          isLoading={this.state.messageModal?.isLoading}
          title={this.state.messageModal?.title}
          message={this.state.messageModal?.message}
          messages={this.state.messageModal?.messages}
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
