import React from 'react';
import PDF from './PDF';


class PostPdf extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            empleado: props?.empleado,
            tipoEmpleado: props?.tipoEmpleado,
            legajo: props?.dni,
            cuil: '20-' + props?.dni + '-5',
            categoria: props?.tipo?.tipoEmpleado,
            fechaIngreso: '01/01/2011', //valor fijo
            Sueldo: props?.monto,
            tipo: 'Mensual',  //valor fijo
            periodo: props?.mes + "/" + props?.anio,
            fecha: "01/" + props?.mes + "/" + props?.anio,
            codigoSueldo: '014', //valor fijo
            detalleSueldo: 'SUELDO',//valor fijo
            cantidadSueldo: '100',//valor fijo el 100 %

            codigoJubilacion: '501',   //valor fijo
            detalleJubilacion: 'JUBILACIÓN', //valor fijo
            cantidadJubilacion: '11', //valor fijo
            deduccionJubilacion: props?.montoJubilacion,

            codigoLey: '505', //valor fijo
            detalleLey: 'LEY 19032', //valor fijo
            cantidadLey: '3',//valor fijo
            deduccionLey: props?.montoLey19032,

            codigoOs: '600',//valor fijo
            detalleOs: 'SALUD ',//valor fijo
            cantidadOs: '3',//valor fijo
            deduccionOs: props?.montoSalud,

            codigoRedondeo: '990',//valor fijo
            detalleRedondeo: 'REDONDEO',//valor fijo
            haberRedondeo: (((-props?.montoJubilacion - props?.montoLey19032 - props?.montoSalud)%1).toFixed(2)),

            totalDeducciones: (-props?.montoJubilacion - props?.montoLey19032 - props?.montoSalud)-(((-props?.montoJubilacion - props?.montoLey19032 - props?.montoSalud)%1)),
            neto: ((-props?.montoJubilacion - props?.montoLey19032 - props?.montoSalud)-(((-props?.montoJubilacion - props?.montoLey19032 - props?.montoSalud)%1)) - (-props?.monto) ).toFixed(0), 

            postSubmitted: false
        };
    }

    render() {
        return (
            <PDF
                empleado={this.state.empleado}
                tipoEmpleado={this.state.tipoEmpleado}
                legajo={this.state.legajo}
                cuil={this.state.cuil}

                categoria={this.state.categoria}
                fechaIngreso={this.state.fechaIngreso}
                Sueldo={this.state.Sueldo}
                tipo={this.state.tipo}
                periodo={this.state.periodo}
                fecha={this.state.fecha}

                codigoSueldo={this.state.codigoSueldo}
                detalleSueldo={this.state.detalleSueldo}
                cantidadSueldo={this.state.cantidadSueldo}

                codigoJubilacion={this.state.codigoJubilacion}
                detalleJubilacion={this.state.detalleJubilacion}
                cantidadJubilacion={this.state.cantidadJubilacion}
                deduccionJubilacion={this.state.deduccionJubilacion}

                codigoLey={this.state.codigoLey}
                detalleLey={this.state.detalleLey}
                cantidadLey={this.state.cantidadLey}
                deduccionLey={this.state.deduccionLey}

                codigoOs={this.state.codigoOs}
                detalleOs={this.state.detalleOs}
                cantidadOs={this.state.cantidadOs}
                deduccionOs={this.state.deduccionOs}

                codigoRedondeo={this.state.codigoRedondeo}
                detalleRedondeo={this.state.detalleRedondeo}
                haberRedondeo={this.state.haberRedondeo}

                totalDeducciones={this.state.totalDeducciones}
                neto={this.state.neto}
            />
        );
    }
}
export default PostPdf;