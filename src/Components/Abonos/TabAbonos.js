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
import ModalTipoAbono from './ModalAbonos';

import { validateRequired } from "../Common/Validations";
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearTipoAbono, editarTipoAbono, eliminarTipoAbono } from "../../Services/tiposAbonoServices";

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

export default class TabTiposAbono extends React.Component {
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
      tipoAbono: "",
      precio: "",
      cantDias: "",
    };
  };

  initializeValidations = () => {
    return {
      tipoAbono: true,
      precio: true,
      cantDias: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      tipoAbono: "",
      precio: "",
      cantDias: "",
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

  handleABM = (method, tipoAbono) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      modalABM: method,
      form: {
        ...prevState.form,
        id: tipoAbono?.id ?? 0,
        tipoAbono: tipoAbono?.tipoAbono ?? "",
        precio: tipoAbono?.precio ?? "",
        cantDias: tipoAbono?.cantDias ?? "",
      },
    }));
  };

  handleAlta = () => this.handleABM("A");
  handleEdicion = (tipoAbono) => this.handleABM("M", tipoAbono);
  handleBaja = (tipoAbono) => this.handleABM("B", tipoAbono);

  validateForm = async () => {
        
    var isTipoAbonoValid = await validateRequired(this.state.form.tipoAbono);
    var isPrecioValid = await validateRequired(this.state.form.precio);
    var isCantDiasValid = await validateRequired(this.state.form.cantDias);

    var tipoAbonoValidationMessage = "El Tipo de abono es requerido...";
    var precioValidationMessage = "El Precio es requerido...";
    var cantDiasValidationMessage = "La cantidad de días es requerida...";

    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        tipoAbono: isTipoAbonoValid,
        precio: isPrecioValid,
        cantDias: isCantDiasValid,
      },
      validationMessages: {
        ...prevState.validationMessages,
        tipoAbono: tipoAbonoValidationMessage,
        precio: precioValidationMessage,
        cantDias: cantDiasValidationMessage,
      },
    }));

    return isTipoAbonoValid && isPrecioValid && isCantDiasValid;
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
        tipoAbono: this.state.form.tipoAbono,
        precio: this.state.form.precio,
        cantDias: this.state.form.cantDias,
      };

      if (this.state.modalABM === "A") {
        crearTipoAbono(request)
          .then((response) => {
            this.onGuardarResponseOk(response);
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      } else if (this.state.modalABM === "M") {
        editarTipoAbono(request)
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
          " de Tipo de Abono fue exitosa!",
        message:
          this.state.modalABM === "A"
            ? "El Tipo de Abono fue dado de alta correctamente."
            : "El Tipo de Abono fue actualizado correctamente.",
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
        title:
          (this.state.modalABM === "A" ? "Alta" : "Edición") +
          " de Tipo de Abono fue errónea :(",
        message:
          "Oops! Ocurrió un error al " +
          (this.state.modalABM === "A" ? "dar de alta" : "editar") +
          " el tipo de abono.",
      },
    }));
  };

  handleEliminar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSaving: true,
    }));

    eliminarTipoAbono(this.state.form.id)
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
        title: "¡Baja de Tipo de Abono exitosa!",
        message: "El Tipo de Abono fue eliminado correctamente.",
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
        title: "Baja de Tipo de Abono errónea",
        message: "Oops! Ocurrió un error al eliminar el Tipo de Abono.",
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
    this.props.recargarTiposAbonoEvent();
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  render() {
    var rowsPerPage = 5;
    var emptyRows =
      this.props.tiposAbono != null
        ? rowsPerPage -
          Math.min(
            rowsPerPage,
            this.props.tiposAbono.length - this.state.page * rowsPerPage
          )
        : rowsPerPage;

    var tiposAbonoPaginado = this.props.tiposAbono?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );

    return (
      <div>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Abono" />
        </ButtonNuevoContainer>

        <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
          <Table style={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tipo</StyledTableCell>
                <StyledTableCell align="center">Precio</StyledTableCell>
                <StyledTableCell align="center">CantDias</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tiposAbonoPaginado.map((tipoAbono) => (
                <StyledTableRow key={tipoAbono.id}>
                  <StyledTableCell>
                    {tipoAbono?.tipoAbono ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tipoAbono?.precio ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tipoAbono?.cantDias ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tipoAbono?.id !== 1 && <EditIcon
                      onClick={() => this.handleEdicion(tipoAbono)}
                      variant="contained"
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />}
                    {tipoAbono?.id !== 1 && <DeleteIcon
                      onClick={() => this.handleBaja(tipoAbono)}
                      style={{ margin: "0 5px", cursor: "pointer" }}
                    />}
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
                  count={this.props.tiposAbono.length}
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

        <ModalTipoAbono
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}
          form={this.state.form}
          tiposAbono={this.props.tiposAbono}
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
