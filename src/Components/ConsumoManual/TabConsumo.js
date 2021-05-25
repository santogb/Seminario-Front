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
import ModalConsumo from './ModalConsumo';
import Moment from 'moment'
import GraficoConsumos from './GraficoConsumos'


import { formatDateToString, formatDateWithTimeToStringPretty } from '../Common/DateHelpers';
import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearConsumo,eliminarConsumo,crearConsumoOCR } from '../../Services/consumoServices';

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
      form: this.initializeForm()    
    };
  }

  initializeForm = () => {
    return {
      IdUsuario: this.props.IdUsuario,
      Periodo: "",
      kwh: "",
      ConsumoTotal: "",
      photo:"" 
    };
  };

  handleChange = (prop, value) => {
    console.log(prop+' '+value)
    debugger;
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

  handleABM = (method, consumo) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: consumo?.id ?? 0,
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleBaja = (consumo) => this.handleABM("B", consumo);

  handleIMP = (method, facturacion) => {

    console.log(formatDateWithTimeToStringPretty(facturacion?.createdAt));

    this.setState((prevState) => ({
      ...prevState,
      isModalOpenPDF: true,
      modalIMP: method,     
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
  handleGuardar = async () => {    
      this.setState((prevState) => ({
        ...prevState,
        isSaving: true,
      }));
      debugger;
      if(this.state.form.photo==""){
        var request = {
          idUsuario: this.state.form.IdUsuario,
          periodo: this.state.form.Periodo,
          kwh: this.state.form.kwh,
          consumoTotal: this.state.form.ConsumoTotal
        };
        console.log(JSON.stringify(request))
        crearConsumo(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
            console.log(JSON.stringify(response))
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      }
      else{
        debugger;
        var request = {
          imgUrl: this.state.form.photo
        };
        crearConsumoOCR(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
            console.log(JSON.stringify(response))
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      }
    //}
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
        title: "Alta de consumo exitoso!",
        message: "El consumo fue dado de alta correctamente.",
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

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarConsumo({id:this.state.form.id, idUsuario:this.state.form.IdUsuario})
      .then((response) => {
        this.onEliminarResponseOk(response);
        console.log(response)
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
        title: "¡Baja del consumo exitoso!",
        message: "El consumo fue eliminado correctamente.",
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
        title: "Baja del consumo errónea",
        message: "Oops! Ocurrió un error al eliminar el consumo.",
      },
    }));
  };
  initializeValidations = () => {
    return {      
      
    };
  };

  initializeValidationMessages = () => {
    return {
      
    };
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
    this.props.recargarConsumoEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 12;
    var emptyRows =
      this.props.Facturacion != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.Facturacion.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var facturacionPaginado = this.props.Facturacion?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );    
    return (
      <div>
        <GraficoConsumos GraphData={facturacionPaginado}/>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Consumo" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table /* style={{ minWidth: 700 }} */ aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Periodo</StyledTableCell>
                <StyledTableCell align="center">Precio Kwh ($)</StyledTableCell>
                <StyledTableCell align="center">Consumo Kw</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturacionPaginado?.map((facturacion) => (
                <StyledTableRow key={facturacion.id}>
                  <StyledTableCell align="center">                   
                    {facturacion? Moment(facturacion.periodo, 'YYYY-MM-DD').format('MMM YYYY') : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facturacion? "$ "+facturacion.kwh : "-"}
                  </StyledTableCell>                  
                  <StyledTableCell align="center">
                    {facturacion? facturacion.consumoTotal+" Kw" : "-"}
                  </StyledTableCell> 
                  <StyledTableCell align="center">                  
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
                  count={this.props.Facturacion?.length ?? 0}
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

        <ModalConsumo
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}          
          form={this.state.form}
          facturacion={this.props.facturacion}
          tiposPago={this.props.tiposPago}
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
