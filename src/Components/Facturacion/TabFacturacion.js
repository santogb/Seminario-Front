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
import PrintIcon from '@material-ui/icons/Print';
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalFacturacion from './ModalFacturacion';
import ModalFacturacionPdf from './ModalFacturacionPdf';

import { formatDateToString, formatDateWithTimeToStringPretty } from '../Common/DateHelpers';
import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearFacturaciones, eliminarFacturacion } from "../../Services/facturacionServices";
import { obtenerSocioPorDni } from "../../Services/sociosServices";
import { crearConsumoTarjeta } from "../../Services/tarjetasServices";

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

export default class TabFacturacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      isModalOpen: false,
      isSaving: false,
      isBuscandoSocio: false,
      modalABM: "",
      modalIMP: "",
      messageModal: null,
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    };
  }

  initializeForm = () => {
    return {
      idTipoPago: "",
      idTipoAbono: "",
      idSocio: "",
      monto: "",
      dni: "",
      nroTarjeta: "",
      titular: "",
      cuotas: "",
      ccv: "",
      fechaVencTarjeta: ""
    };
  };

  initializeFormPDF = () => {
    return {
      cliente: "",
      tipoPago: "",
      cuotas: "",
      numeroRecibo: "",
      fecha: "",
      apellido: "",
      nombre: "",
      dni: "",
      tipoAbono: "",
      monto: "",
    };
  };

  initializeValidations = () => {
    return {
      idTipoPago: true,
      idTipoAbono: true,
      idSocio: true,
      monto: true,
      dni: true,
      nroTarjeta: "",
      titular: "",
      cuotas: "",
      ccv: "",
      fechaVencTarjeta: ""
    };
  };

  initializeValidationMessages = () => {
    return {
      idTipoPago: "",
      idTipoAbono: "",
      idSocio: "",
      monto: "",
      dni: "",
      nroTarjeta: "",
      titular: "",
      cuotas: "",
      ccv: "",
      fechaVencTarjeta: ""
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

  handleChangeTipoPago = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        idTipoPago: value,
        nroTarjeta: "",
        titular: "",
        cuotas: "",
        ccv: "",
        fechaVencTarjeta: ""
      },
      validations: {
        ...prevState.validations,
        idTipoPago: true,
        nroTarjeta: true,
        titular: true,
        cuotas: true,
        ccv: true,
        fechaVencTarjeta: true
      },
    }));
  };

  handleChangeDni = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [prop]: value,
        idTipoAbono: "",
        idSocio: "",
        nombre: "",
        monto: "",
        nroTarjeta: "",
        titular: "",
        cuotas: "",
        ccv: "",
        fechaVencTarjeta: ""
      },
      validations: {
        ...prevState.validations,
        [prop]: true,
        idTipoAbono: true,
        idSocio: true,
        monto: true,
        nroTarjeta: true,
        titular: true,
        cuotas: true,
        ccv: true,
        fechaVencTarjeta: true
      },
    }));
  };

  handleChangePage = (event, newPage) => {
    this.setState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  handleABM = (method, facturacion) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: facturacion?.id ?? 0,
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleBaja = (facturacion) => this.handleABM("B", facturacion);
  handleImprimirRecibo = (facturacion) => this.handleIMP("I", facturacion);


  handleIMP = (method, facturacion) => {

    console.log(formatDateWithTimeToStringPretty(facturacion?.createdAt));

    this.setState((prevState) => ({
      ...prevState,
      isModalOpenPDF: true,
      modalIMP: method,
      formPDF: {
        ...prevState.formPDF,
        tipoPago: facturacion?.tipoPago?.tipoPago,
        cuotas: facturacion?.cuotas ?? "-",
        numeroRecibo: facturacion?.id?.toString()?.padStart(10, "0"),
        fecha: formatDateWithTimeToStringPretty(facturacion?.createdAt),
        fechaHoy: formatDateWithTimeToStringPretty(formatDateToString(new Date())),
        apellido: facturacion?.socio?.apellido,
        nombre: facturacion?.socio?.nombre,
        dni: facturacion?.socio?.dni,
        tipoAbono: facturacion?.tipoAbono?.tipoAbono,
        monto: facturacion?.monto,
      },
    }));
  };


  validateForm = async () => {

    var isIdTipoPagoValid = await validateRequired(this.state.form.idTipoPago);
    var isIdTipoAbonoValid = await validateRequired(this.state.form.idTipoAbono);
    var isIdSocioValid = await validateRequired(this.state.form.idSocio);
    var isMontoValid = await validateRequired(this.state.form.monto);
    var isDniValid = await validateRequired(this.state.form.dni);
    var isNroTarjetaValid = true;
    var isTitularValid = true;
    var isCuotasValid = true;
    var isCCVValid = true;
    var isFechaVencTarjetaValid = true;

    if(isIdTipoPagoValid && this.state.form.idTipoPago === 2){ //Es tarjeta
      isNroTarjetaValid = await validateRequired(this.state.form.nroTarjeta);
      isTitularValid = await validateRequired(this.state.form.titular);
      isCuotasValid = await validateRequired(this.state.form.cuotas);
      isCCVValid = await validateRequired(this.state.form.ccv);
      isFechaVencTarjetaValid = await validateRequired(this.state.form.fechaVencTarjeta);
    }

    var idTipoPagoValidationMessage = "El Tipo de Pago es requerido...";
    var idTipoAbonoValidationMessage = "El tipo de abono no existe...";
    var idSocioValidationMessage = "El socio no existe...";
    var montoiValidationMessage = "El abono  no posee un monto establecido...";
    var dniValidationMessage = "El DNI es requerido...";
    var nroTarjetaValidationMessage = "El Nro. Tarjeta es requerido...";
    var titularValidationMessage = "El Titular es requerido...";
    var cuotasValidationMessage = "La Cant. Cuotas es requerida...";
    var ccvValidationMessage = "El CCV es requerido...";
    var fechaVencTarjetaValidationMessage = "La F. Vencimiento es requerido...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        idTipoPago: isIdTipoPagoValid,
        idTipoAbono: isIdTipoAbonoValid,
        idSocio: isIdSocioValid,
        monto: isMontoValid,
        dni: isDniValid,
        nroTarjeta: isNroTarjetaValid,
        titular: isTitularValid,
        cuotas: isCuotasValid,
        ccv: isCCVValid,
        fechaVencTarjeta: isFechaVencTarjetaValid
      },
      validationMessages: {
        ...prevState.validationMessages,
        idTipoPago: idTipoPagoValidationMessage,
        idTipoAbono: idTipoAbonoValidationMessage,
        idSocio: idSocioValidationMessage,
        monto: montoiValidationMessage,
        dni: dniValidationMessage,
        nroTarjeta: nroTarjetaValidationMessage,
        titular: titularValidationMessage,
        cuotas: cuotasValidationMessage,
        ccv: ccvValidationMessage,
        fechaVencTarjeta: fechaVencTarjetaValidationMessage
      },
    }));

    return isIdTipoPagoValid 
    && isIdTipoAbonoValid 
    && isIdSocioValid 
    && isMontoValid 
    && isDniValid
    && isNroTarjetaValid
    && isTitularValid
    && isCuotasValid
    && isCCVValid
    && isFechaVencTarjetaValid;
  };

  validateSocioForm = async () => {
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

  handleBuscarSocio = async () => {
    const isValidForm = await this.validateSocioForm();

    if (isValidForm && !this.state.isBuscandoSocio) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoSocio: true,
        form: {
          ...prevState.form,
          nombre: "",
          idTipoAbono: "",
          idSocio: "",
          monto: "",
          nroTarjeta: "",
          titular: "",
          cuotas: "",
          ccv: "",
          fechaVencTarjeta: ""
        },
      }));

      obtenerSocioPorDni(this.state.form.dni)
        .then((response) => {
          this.onBuscarSocioResponseOk(response?.socio);
        })
        .catch((error) => {
          this.onBuscarSocioResponseError(error);
        });
    }
  };

  onBuscarSocioResponseOk = (response) => {
    if (response) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoSocio: false,
        form: {
          ...prevState.form,
          nombre: response?.apellido
            ? response?.apellido + ", " + (response?.nombre ?? "")
            : "",
          idTipoAbono: response?.abono?.idTipoAbono ?? "",
          idSocio: response?.id ?? "",
          monto: response?.abono?.tipoAbono?.precio ?? ""
        },
        validations: this.initializeValidations(),
        validationMessages: this.initializeValidationMessages(),
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isBuscandoSocio: false,
        form: this.initializeForm(),
        messageModal: {
          ...prevState.messageModal,
          isOpen: true,
          isSuccess: false,
          isError: true,
          title: "Búsqueda de Socio",
          message:
            "No se encontró ningún socio con el DNI '" +
            this.state.form.dni +
            "'",
        },
      }));
    }
  };

  onBuscarSocioResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isBuscandoSocio: false,
      form: this.initializeForm(),
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Búsqueda de Socio",
        message: "Oops! Ocurrió un error al buscar el socio.",
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
        idTipoAbono: this.state.form.idTipoAbono,
        idSocio: this.state.form.idSocio,
        monto: this.state.form.monto, 
        cuotas: this.state.form.cuotas
      };

      if (this.state.form.idTipoPago === 2) {

        var requestTarjeta = {
          nroTarjeta: this.state.form.nroTarjeta,
          ccv: this.state.form.ccv,
          monto: this.state.form.monto,
        }

        crearConsumoTarjeta(requestTarjeta)
          .then((response) => {
            if (response.codigo === 1) {

              request = {
                ...request,
                nroOperacionTarjeta: response.operacion
              }

              crearFacturaciones(request)
                .then(() => {
                  this.onGuardarResponseTarjetaOk(response);
                })
                .catch(() => {
                  this.onGuardarTarjetaResponseError(response.mensaje);  
                });
            }else{
              this.onGuardarTarjetaResponseError(response.mensaje);  
            }
          })
          .catch((error) => {
            this.onGuardarTarjetaResponseError(error);
          });
      } else {
        crearFacturaciones(request)
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
        title: "Alta de facturación exitosa!",
        message: "La facturacion fue dado de alta correctamente.",
      },
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
    }));
  };

  onGuardarResponseTarjetaOk = (response) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: true,
        isError: false,
        title: "Facturación con tarjeta!",
        message: response.mensaje + ' - Operación: ' + response.operacion,
      },
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
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
        title: "Alta de facturación fue errónea :(",
        message: "Oops! Ocurrió un error al dar de alta la facturación",
      },
    }));
  };

  onGuardarTarjetaResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: false,
      isModalOpen: false,
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "La facturación con tarjeta falló :(",
        message: "Oops! " + error,
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarFacturacion(this.state.form.id)
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
        title: "¡Baja de la facturacion exitosa!",
        message: "La facturacion fue eliminado correctamente.",
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
        title: "Baja de la facturacion errónea",
        message: "Oops! Ocurrió un error al eliminar la facturacion.",
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
    this.props.recargarFacturacionEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.facturacion != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.facturacion.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var facturacionPaginado = this.props.facturacion?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nueva Facturación" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nro.</StyledTableCell>
                <StyledTableCell align="center">Nro. Externo</StyledTableCell>
                <StyledTableCell>Socio</StyledTableCell>
                <StyledTableCell align="center">Tipo de Pago</StyledTableCell>
                <StyledTableCell align="center">Tipo de Abono</StyledTableCell>
                <StyledTableCell align="center">Monto</StyledTableCell>
                <StyledTableCell align="center">Cuotas</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturacionPaginado?.map((facturacion) => (
                <StyledTableRow key={facturacion.id}>
                  <StyledTableCell align="center">
                    {facturacion?.id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion?.nroOperacionTarjeta ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {facturacion?.socio?.apellido +
                      ", " +
                      facturacion?.socio?.nombre ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion?.tipoPago?.tipoPago ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion?.tipoAbono?.tipoAbono ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion?.monto ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion?.cuotas ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <PrintIcon
                      onClick={() => this.handleImprimirRecibo(facturacion)}
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => this.handleBaja(facturacion)}
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
                  count={this.props.facturacion?.length ?? 0}
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

        <ModalFacturacion
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}
          isBuscandoSocio={this.state.isBuscandoSocio}
          form={this.state.form}
          facturacion={this.props.facturacion}
          tiposPago={this.props.tiposPago}
          validations={this.state.validations}
          validationMessages={this.state.validationMessages}
          handleGuardar={this.handleGuardar}
          handleEliminar={this.handleEliminar}
          handleCerrar={this.handleCerrar}
          handleChange={this.handleChange}
          handleChangeTipoPago={this.handleChangeTipoPago}
          handleChangeDni={this.handleChangeDni}
          handleBuscarSocio={this.handleBuscarSocio}
        />
          <ModalFacturacionPdf
          isOpenPdf={this.state.isModalOpenPDF}
          form={this.state.formPDF}
          handleCerrar={this.handleCerrarPDF}
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
