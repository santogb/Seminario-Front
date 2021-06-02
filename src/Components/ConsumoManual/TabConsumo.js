import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import ModalConsumo from './ModalConsumo';
import GraficoConsumos from './GraficoConsumos'

import { MessageModal, PaginationActions, CustomButton } from '../Common';
import { crearConsumo,eliminarConsumo,crearConsumoOCR } from '../../Services/consumoServices';
import MyTable from '../Table/Table'

const ButtonNuevoContainer = styled(Container)({
  textAlign: 'right',
  padding: 0
});



export default class TabConsumo extends React.Component {
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
      columnas: this.initializeColumnas(),
      WhatToShow: this.initializeWhatToShow(), 
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
  initializeColumnas = () => {
    return [
      {
        nombre: "Periodo"
      },
      {
        nombre: "Precio Kwh ($)"
      },
      {
        nombre: "Consumo kw"
      },
    ];
  };
  initializeWhatToShow = () => {
    return [
      {
        nombre: "periodo"
      },
      {
        nombre: "kwh"
      },
      {
        nombre: "consumoTotal"
      },
    ];
  };

  handleChange = (prop, value) => {
    this.setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [prop]: value,
      },
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
          })
          .catch((error) => {
            this.onGuardarResponseError(error);
          });
      }
      else{
        debugger;
        var request = {
          content: this.state.form.photo
        };
        crearConsumoOCR(request)
          .then((response) => {
            console.log(response)
            crearConsumo(request).then((response) => {
              this.onGuardarResponseOk(response);            
            })
            .catch((error) => {
              this.onGuardarResponseError(error);
            });
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
      //validations: this.initializeValidations(),
      //validationMessages: this.initializeValidationMessages(),
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

  handleCerrar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      form: this.initializeForm(),
      //validations: this.initializeValidations(),
      //validationMessages: this.initializeValidationMessages(),
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
  handleChangePage = (event, newPage) => {
    this.setState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };
  
  render() {
    var rowsPerPage = 12;
    var datosPaginados = this.props.datos?.slice(
      this.state.page * rowsPerPage,
      this.state.page * rowsPerPage + rowsPerPage
    );     
    return (
      <div>
        <GraficoConsumos GraphData={datosPaginados}/>
        <ButtonNuevoContainer maxWidth="lg">
          <CustomButton handleClick={this.handleAlta} text="Nuevo Consumo" />
        </ButtonNuevoContainer>
        
        <MyTable 
        datos={this.props.datos} 
        rowsPerPage={rowsPerPage} 
        columnas={this.state.columnas}
        WhatToShow={this.state.WhatToShow} 
        handleChangePageEvent={this.handleChangePage}
        page={this.state.page}
        totalAmount={this.props.datos?.length}/>

        <ModalConsumo
          isOpen={this.state.isModalOpen}
          modalABM={this.state.modalABM}
          isSaving={this.state.isSaving}          
          form={this.state.form}
          facturacion={this.props.datos}
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
