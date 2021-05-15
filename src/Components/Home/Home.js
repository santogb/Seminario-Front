import React, { useEffect } from "react";
import Layout from '../Layout/Layout.js';
import "./Home.scss";
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment'
import 'moment/locale/es';

import { LoadingData } from '../Common';

import { listarServiciosPorSemana } from '../../Services/serviciosServices';
import BackgroundVideo from "../Common/BackgroundVideo.js";
import EstimatedProduction from "../EstimatedProduction/EstimatedProduction";
;

export default function Home() {
  
  useEffect(() => {
    document.title = "CityGym - Inicio"
  }, [])

  const [isLoadingServiciosPorSemana, setIsLoadingServiciosPorSemana] = React.useState(false);
  const [serviciosPorSemana, setServiciosPorSemana] = React.useState(null);

  const obtenerHorarioInicio = (servicio) => servicio?.horarioMañana ? new moment({h: 8, m: 0}) : servicio?.horarioTarde ? new moment({h: 14, m: 0}) : new moment({h: 18, m: 0});
  const obtenerHorarioFin = (servicio) => servicio?.horarioNoche ? new moment({h: 22, m: 0}) : servicio?.horarioTarde ? new moment({h: 18, m: 0}) : new moment({h: 12, m: 0});

  const obtenerIntervalo = (uid, servicio, days) => {
    return {
      uid: uid,
      start: obtenerHorarioInicio(servicio).add(days,'d'),
      end: obtenerHorarioFin(servicio).add(days,'d'),
      value: servicio?.tipo?.tipoServicio + " - " + servicio?.empleado?.apellido + ", "+ servicio?.empleado?.nombre
    }
  }

  const recargarServiciosPorSemana = () => {

    setIsLoadingServiciosPorSemana(true); 

    listarServiciosPorSemana()
      .then((response) => {

        var selectedIntervals = [];
        var uid = 0;

        var day = new Date().getDay();
        
        var dateDiff = day === 0 ? 0 
        : day === 1 ? -1
        : day === 2 ? -2
        : day === 3 ? -3
        : day === 4 ? -4
        : day === 5 ? -5
        : day === 6 ? -6 : 0;        

        var domingoDateDiff = dateDiff++;
        var lunesDateDiff = dateDiff++;
        var martesDateDiff = dateDiff++;
        var miercolesDateDiff = dateDiff++;
        var juevesDateDiff = dateDiff++;
        var viernesDateDiff = dateDiff++;
        var sabadoDateDiff = dateDiff++;

        domingoDateDiff = domingoDateDiff < 0 ? domingoDateDiff + 7 : domingoDateDiff;
        lunesDateDiff = lunesDateDiff < 0 ? lunesDateDiff + 7 : lunesDateDiff;
        martesDateDiff = martesDateDiff < 0 ? martesDateDiff + 7 : martesDateDiff;
        miercolesDateDiff = miercolesDateDiff < 0 ? miercolesDateDiff + 7 : miercolesDateDiff;
        juevesDateDiff = juevesDateDiff < 0 ? juevesDateDiff + 7 : juevesDateDiff;
        viernesDateDiff = viernesDateDiff < 0 ? viernesDateDiff + 7 : viernesDateDiff;
        sabadoDateDiff = sabadoDateDiff < 0 ? sabadoDateDiff + 7 : sabadoDateDiff;
        
        selectedIntervals = selectedIntervals.concat(response?.semana?.lunes?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, lunesDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.martes?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, martesDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.miercoles?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, miercolesDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.jueves?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, juevesDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.viernes?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, viernesDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.sabado?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, sabadoDateDiff);
        }) ?? []);

        selectedIntervals = selectedIntervals.concat(response?.semana?.domingo?.map((servicio) => {
          uid = uid + 1;
          return obtenerIntervalo(uid, servicio, domingoDateDiff);
        }) ?? []);

        setServiciosPorSemana(selectedIntervals);
        setIsLoadingServiciosPorSemana(false);
      })
      .catch(error => {
        setIsLoadingServiciosPorSemana(false);
      });
  }

  if (serviciosPorSemana === null && !isLoadingServiciosPorSemana) {
    recargarServiciosPorSemana();
  }

  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const day = new Date().getDay();

  return (
    <div>
      <Layout title="Inicio">     
        <EstimatedProduction/>
      </Layout>
    </div>
  );
}
