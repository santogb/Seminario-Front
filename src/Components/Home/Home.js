import React, { useEffect } from "react";
import Layout from '../Layout/Layout.js';
import "./Home.scss";
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment'
import 'moment/locale/es';

import { listarServiciosPorSemana } from '../../Services/serviciosServices';

import Iframe from 'react-iframe'
;

export default function Home() {
  
  useEffect(() => {
    document.title = "Infinite - Inicio"
  }, [])

  return (
    <div>
      <Layout title="Inicio">     
        <Iframe url="https://cdsrenovables.cammesa.com/renovableschart/#/totalesLineAndPie"
                      width="100%"
                      height="2000px"
                      id="RenewableEnergy"
                      className="RenewableEnergy"
                      display="initial"
                      position="relative"                      
                      />
      </Layout>
    </div>
  );
}
