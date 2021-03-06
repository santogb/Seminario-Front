import React from "react";

import MyTable from '../Table/Table';
import { styled } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import { crearEstimado,eliminarEstimado } from '../../Services/estimadosServices';
import { obtenerElectrodomestico } from '../../Services/electrodomesticosServices';
import { MessageModal, PaginationActions, CustomButton } from '../Common';
import ModalEstimados from './ModalEstimados';

const ButtonNuevoContainer = styled(Container)({
    textAlign: 'right',
    padding: 0
});
export default class TabEstimados extends React.Component {
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
          DataToShow: this.buildDataToShow(), 
        };
    }
    initializeForm = () => {
        return {
          idElectrodomestico: 0,
          tiempo: 0,           
        };
    };
    initializeColumnas = () => {
    return [
            {
                nombre: "Electrodomestico"
            },
            {
                nombre: "Tiempo"
            },
            {
                nombre: "Consumo"
            },
            /* {
                nombre: "Status"
            }, */
        ];
    };
    initializeWhatToShow = () => {
        return [
            {
              nombre: "electrodomestico"
            },
            {
              nombre: "tiempo"
            }, 
            {
              nombre: "consumo"
            }, 
            /* {
              nombre: "status"
            },  */           
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
    handleCerrar = () => {
      this.setState((prevState) => ({
        ...prevState,
        isModalOpen: false,
        form: this.initializeForm(),
        //validations: this.initializeValidations(),
        //validationMessages: this.initializeValidationMessages(),
      }));
    };
    handleAlta = () => this.handleABM("A");
    handleBaja = (consumo) => this.handleABM("B", consumo);
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
      }));
    };
    handleCerrarMessageModal = () => {
      this.cerrarMessageModal();
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
          title: "Alta de facturaci??n fue err??nea :(",
          message: "Oops! Ocurri?? un error al dar de alta la facturaci??n",
        },
      }));
    };
    handleGuardar = async () => {          
        this.setState((prevState) => ({
          ...prevState,
          isSaving: true,
        }));   
        var request = {
          idUsuario: this.props.IdUsuario,
          tiempo: this.state.form.tiempo,
          status: "bueno",
          idElectrodomestico: this.state.form.idElectrodomestico
        };
        console.log(JSON.stringify(request))
        crearEstimado(request)
        .then((response) => {          
            this.onGuardarResponseOk(response);            
        })
        .catch((error) => {          
            this.onGuardarResponseError(error);
        });            
    };

    handleChangePage = (event, newPage) => {
      this.setState((prevState) => ({
        ...prevState,
        page: newPage,
      }));
    };

    handleAceptarMessageModal = () => {
      this.cerrarMessageModal();
      this.props.recargarEstimadosEvent();
    };

    buildDataToShow = () =>{
      var list = [];
      this.props.datos.forEach(dato => {
        var tabla={
          electrodomestico:"",
          tiempo:"",
          consumo:"",
          status:""
        };        
        obtenerElectrodomestico(dato.electrodomestico).then(response=>{
          console.log(response)
          tabla.electrodomestico=response.data?.nombre;
          tabla.tiempo=dato.tiempo + " min.";
          tabla.consumo=dato.tiempo*response.data?.whPromedio+" wh";
          tabla.status=dato.status;
        });
        list.push(tabla);
      });
      return list;
    }

    render() {
        console.log(this.state.DataToShow)
        var rowsPerPage = 5;
        var datosPaginados = this.state.DataToShow?.slice(
          this.state.page * rowsPerPage,
          this.state.page * rowsPerPage + rowsPerPage
        );
        console.log(this.props.electro);
        return (
          <div>
            {/* <GraficoConsumos GraphData={datosPaginados}/> */}
            <ButtonNuevoContainer maxWidth="lg">
              <CustomButton handleClick={this.handleAlta} text="Calcular consumo estimado" />
            </ButtonNuevoContainer>
               
            <MyTable 
              datos={this.state.DataToShow} 
              rowsPerPage={rowsPerPage} 
              columnas={this.state.columnas}
              WhatToShow={this.state.WhatToShow} 
              handleChangePageEvent={this.handleChangePage}
              page={this.state.page}
              totalAmount={this.state.DataToShow?.length}
            />
    
            <ModalEstimados
              isOpen={this.state.isModalOpen}
              modalABM={this.state.modalABM}
              isSaving={this.state.isSaving}          
              form={this.state.form}              
              electrodomesticos = {this.props.electro}
              handleGuardar={this.handleGuardar}
              handleEliminar={this.handleEliminar}
              handleCerrar={this.handleCerrar}  
              handleChange={this.handleChange}  
              handleSuccess={this.handleAceptarMessageModal}     
              isSuccess={this.state.messageModal?.isSuccess}
            />              
    
            {<MessageModal
              isOpen={this.state.messageModal?.isOpen}
              isLoading={this.state.messageModal?.isLoading}
              title={this.state.messageModal?.title}
              message={this.state.messageModal?.message}
              isSuccess={this.state.messageModal?.isSuccess}
              isError={this.state.messageModal?.isError}
              handleSuccess={this.handleAceptarMessageModal}
              handleError={this.handleCerrarMessageModal}
              handleClose={this.handleCerrarMessageModal}
            />}
          </div>
        );
      }
}