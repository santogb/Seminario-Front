import React from "react";
import Layout from "../Layout/Layout.js";
import Grid from "@material-ui/core/Grid";
import Buscar from "./Buscar";
import UltimosIngresos from "./UltimosIngresos";

import { validateRequired } from "../Common/Validations";
import {
  formatDateWithTimeToString,
  formatStringToDate,
} from "../Common/DateHelpers";
import { MessageModal } from "../Common";

import { obtenerSocioPorDni } from "../../Services/sociosServices";
import { obtenerEmpleadoPorDni } from "../../Services/empleadosServices";
import {
  listarIngresosPorSocio,
  listarIngresosPorEmpleado,
  crearIngreso,
} from "../../Services/ingresosServices";

export default class Ingresos extends React.Component {
  constructor(props) {

    document.title = "CityGym - Ingresos";

    super(props);
    this.state = {
      isBuscando: false,
      isLoadingIngresos: false,
      isSuccessIngreso: false,
      isWarningIngreso: false,
      isErrorIngreso: false,
      mensajeIngreso: "",
      messageModal: null,
      form: this.initializeForm(),
      validations: this.initializeValidations(),
      validationMessages: this.initializeValidationMessages(),
      ingresos: null,
    };
  }

  initializeForm = () => {
    return {
      idSocio: "",
      idEmpleado: "",
      dni: "",
    };
  };

  initializeValidations = () => {
    return {
      dni: true,
    };
  };

  initializeValidationMessages = () => {
    return {
      dni: "",
    };
  };

  handleChange = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      isBuscando: false,
      isLoadingIngresos: false,
      isSuccessIngreso: false,
      isWarningIngreso: false,
      isErrorIngreso: false,
      mensajeIngreso: "",
      form: {
        ...prevState.form,
        [prop]: value,
        idSocio: "",
        idEmpleado: "",
        nombre: "",
        apellido: "",
        estadoPago: "",
        fechaAptoFisico: "",
      },
      validations: {
        ...prevState.validations,
        [prop]: true,
      },
      ingresos: null,
    }));
  };

  validateForm = async () => {
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
    const isValidForm = await this.validateForm();

    if (isValidForm && !this.state.isBuscando) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscando: true,
        isSuccessIngreso: false,
        isWarningIngreso: false,
        isErrorIngreso: false,
        mensajeIngreso: "",
        form: {
          ...prevState.form,
          idSocio: "",
          idEmpleado: "",
          nombre: "",
          apellido: "",
          estadoPago: "",
          fechaAptoFisico: "",
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

  handleBuscarEmpleado = async () => {
    const isValidForm = await this.validateForm();

    if (isValidForm && !this.state.isBuscando) {
      this.setState((prevState) => ({
        ...prevState,
        isBuscando: true,
        isSuccessIngreso: false,
        isWarningIngreso: false,
        isErrorIngreso: false,
        mensajeIngreso: "",
        form: {
          ...prevState.form,
          idSocio: "",
          idEmpleado: "",
          nombre: "",
          apellido: "",
          estadoPago: "",
          fechaAptoFisico: "",
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

  onBuscarSocioResponseOk = (response) => {
    if (response) {
      var mensajeIngreso = "";
      var isSuccessIngreso = true;
      var isWarningIngreso = false;
      var isErrorIngreso = false;

      if (!response?.abono) {
        mensajeIngreso = "El socio no posee un abono."
        isSuccessIngreso = false;
        isWarningIngreso = false;
        isErrorIngreso = true;
      } else if (
        response?.abono?.idEstadoPago === 1 ||
        response?.abono?.idEstadoPago === 3
      ) {
        mensajeIngreso =
          response?.abono?.idEstadoPago === 1
            ? "El estado de su abono se encuentra 'Pendiente de Pago'"
            : "El estado de su abono se encuentra 'Anulado'";
        isSuccessIngreso = false;
        isWarningIngreso = false;
        isErrorIngreso = true;
      } else if (response?.fechaAptoFisico) {
        var fechaAptoFisico = formatStringToDate(
          formatDateWithTimeToString(response?.fechaAptoFisico)
        );
        var fechaAvisoAptoFisico = new Date();
        var fechaVencimientoAptoFisico = new Date();

        fechaAvisoAptoFisico.setDate(fechaAptoFisico.getDate() + 330);
        fechaVencimientoAptoFisico.setDate(fechaAptoFisico.getDate() + 365);

        if (
          fechaAptoFisico.getTime() < fechaAvisoAptoFisico.getTime() &&
          fechaAptoFisico.getTime() < fechaVencimientoAptoFisico.getTime()
        ) {
          mensajeIngreso = "";
          isSuccessIngreso = true;
          isWarningIngreso = false;
          isErrorIngreso = false;
        } else if (
          fechaAptoFisico.getTime() > fechaAvisoAptoFisico.getTime() &&
          fechaAptoFisico.getTime() < fechaVencimientoAptoFisico.getTime()
        ) {
          mensajeIngreso = "Su Apto Físico se encuentra próximo a vencer!";
          isSuccessIngreso = false;
          isWarningIngreso = true;
          isErrorIngreso = false;
        }
      } else {
        mensajeIngreso = "Debe presentar su apto físico.";
        isSuccessIngreso = false;
        isWarningIngreso = false;
        isErrorIngreso = true;
      }

      this.setState((prevState) => ({
        ...prevState,
        isBuscando: false,
        isLoadingIngresos: true,
        isSuccessIngreso: isSuccessIngreso,
        isWarningIngreso: isWarningIngreso,
        isErrorIngreso: isErrorIngreso,
        mensajeIngreso: mensajeIngreso,
        form: {
          ...prevState.form,
          idSocio: response?.id ?? "",
          idEmpleado: "",
          nombre: response?.nombre ?? "",
          apellido: response?.apellido ?? "",
          estadoPago: response?.abono?.estadoPago?.estadoPago ?? "",
          fechaAptoFisico:
            formatDateWithTimeToString(response?.fechaAptoFisico) ?? "",
        },
        validations: this.initializeValidations(),
        validationMessages: this.initializeValidationMessages(),
      }));

      this.recargarListadoIngresosSocio();
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isBuscando: false,
        isSuccessIngreso: false,
        isWarningIngreso: false,
        isErrorIngreso: false,
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

  onBuscarEmpleadoResponseOk = (response) => {
    if (response) {

      this.setState((prevState) => ({
        ...prevState,
        isBuscando: false,
        isLoadingIngresos: true,
        isSuccessIngreso: true,
        isWarningIngreso: false,
        isErrorIngreso: false,
        mensajeIngreso: "",
        form: {
          ...prevState.form,
          idSocio: "",
          idEmpleado: response?.id ?? "",
          nombre: response?.nombre ?? "",
          apellido: response?.apellido ?? "",
          estadoPago: "No Aplica",
          fechaAptoFisico: "",
        },
        validations: this.initializeValidations(),
        validationMessages: this.initializeValidationMessages(),
      }));

      this.recargarListadoIngresosEmpleado();
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isBuscando: false,
        isLoadingIngresos: false,
        isSuccessIngreso: false,
        isWarningIngreso: false,
        isErrorIngreso: false,
        form: this.initializeForm(),
        messageModal: {
          ...prevState.messageModal,
          isOpen: true,
          isSuccess: false,
          isError: true,
          title: "Búsqueda de Empleado",
          message:
            "No se encontró ningún empleado con el DNI '" +
            this.state.form.dni +
            "'",
        },
      }));
    }
  };

  recargarListadoIngresosSocio() {
    listarIngresosPorSocio(this.state.form.idSocio).then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoadingIngresos: false,
        ingresos: response?.status === "OK" ? response.ingresos : [],
      }));
    });
  }

  recargarListadoIngresosEmpleado() {
    listarIngresosPorEmpleado(this.state.form.idEmpleado).then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        isLoadingIngresos: false,
        ingresos: response?.status === "OK" ? response.ingresos : [],
      }));
    });
  }

  onBuscarSocioResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isBuscando: false,
      isSuccessIngreso: false,
      isWarningIngreso: false,
      isErrorIngreso: false,
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

  onBuscarEmpleadoResponseError = (error) => {
    this.setState((prevState) => ({
      ...prevState,
      isBuscando: false,
      isSuccessIngreso: false,
      isWarningIngreso: false,
      isErrorIngreso: false,
      form: this.initializeForm(),
      messageModal: {
        ...prevState.messageModal,
        isOpen: true,
        isSuccess: false,
        isError: true,
        title: "Búsqueda de Empleado",
        message: "Oops! Ocurrió un error al buscar el empleado.",
      },
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
  };

  handleCerrarMessageModal = () => {
    this.cerrarMessageModal();
  };

  handleMarcarIngreso = () => {
    var request = {
      idSocio: this.state.form.idSocio,
      idEmpleado: this.state.form.idEmpleado
    };

    if (this.state.form.idSocio) {
      crearIngreso(request).then(() => {
        this.recargarListadoIngresosSocio();
      });
    } else {
      crearIngreso(request).then((response) => {
        if (response?.id > 0) {
          this.recargarListadoIngresosEmpleado();
        }else{
          this.setState((prevState) => ({
            ...prevState,
            isBuscando: false,
            isSuccessIngreso: false,
            isWarningIngreso: false,
            isErrorIngreso: false,
            form: this.initializeForm(),
            messageModal: {
              ...prevState.messageModal,
              isOpen: true,
              isSuccess: false,
              isError: true,
              title: "Ingreso de Empleado",
              message: response?.message,
            },
          }));
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Layout title="Ingresos">
          <Grid container spacing={3}>
            <Grid item md={12} lg={6}>
              <Buscar
                isErrorIngreso={this.state.isErrorIngreso}
                isWarningIngreso={this.state.isWarningIngreso}
                isSuccessIngreso={this.state.isSuccessIngreso}
                isBuscando={this.state.isBuscando}
                mensajeIngreso={this.state.mensajeIngreso}
                form={this.state.form}
                validations={this.state.validations}
                validationMessages={this.state.validationMessages}
                handleChange={this.handleChange}
                handleBuscarSocio={this.handleBuscarSocio}
                handleBuscarEmpleado={this.handleBuscarEmpleado}
                handleMarcarIngreso={this.handleMarcarIngreso}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <UltimosIngresos ingresos={this.state.ingresos} />
            </Grid>
          </Grid>

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
        </Layout>
      </div>
    );
  }
}
