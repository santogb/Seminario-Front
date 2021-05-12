import React from 'react';
import PDF from './PDF';


class PostPdf extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            tipoPago: props?.tipoPago,
            cuotas: props?.cuotas,
            numeroRecibo: props?.numeroRecibo,
            fecha: props?.fecha,
            fechaHoy: props?.fechaHoy,
            apellido:props?.apellido,
            nombre: props?.nombre,  
            dni: props?.dni,
            tipoAbono: props?.tipoAbono,
            monto: props?.monto, 
            postSubmitted: false
        };
    }

    render() {
        return (
            <PDF
                tipoPago={this.state.tipoPago}
                cuotas={this.state.cuotas}
                numeroRecibo={this.state.numeroRecibo}
                fecha={this.state.fecha}
                fechaHoy={this.state.fechaHoy}
                apellido={this.state.apellido}
                nombre={this.state.nombre}
                dni={this.state.dni}
                tipoAbono={this.state.tipoAbono}
                monto={this.state.monto}              
            />
        );
    }
}
export default PostPdf;