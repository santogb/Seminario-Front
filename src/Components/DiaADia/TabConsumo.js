import React from "react";
import { Container } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import GraficoConsumos from './GraficoConsumos'
import Moment from 'moment'
import Tour from './DiaAdiaTour'

import MyTable from '../Table/Table'

const ButtonNuevoContainer = styled(Container)({
  textAlign: 'right',
  padding: 0
});



export default class TabConsumo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0      
    };
  }
 
  render(){
    var dia = [];
    var hora = [];
    var today = new Date();
    var dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.props.datos.reduce(function(res, value) {   
      var date = Moment(value.fechaYHora, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
      if (!res[date]) {
        res[date] = { fechaYHora: date, consumo: 0 };
        dia.push(res[date])
      }
      res[date].consumo += value.consumo;
      return res;
    }, {});
    this.props.datos.map((value) =>{   
      var date = Moment(value.fechaYHora, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
      if(Moment(value.fechaYHora, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY')==Moment('2021-04-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY')){
          //res[date] = { fechaYHora: date, consumo: value.consumo };
          hora.push({ fechaYHora: date, consumo: value.consumo })
          //return res;
      }
    }, {});
    console.log(hora)
    console.log(dia)
    return(
          <div>
              <Tour/>
              <div class='PorHora'>
                <GraficoConsumos GraphData={hora} originDateFormat="HH:mm:ss" showDateFormat="HH:mm:ss" label="Por hora"/> 
              </div>
              <div class='PorDia'>
                <GraficoConsumos GraphData={dia} originDateFormat="DD-MM-YYYY" showDateFormat="DD-MM-YYYY" label="Por Dia"/>               
              </div>
          </div>
    )
  }
}