import React, { useEffect } from "react";
import Layout from '../Layout/Layout.js';
import Iframe from 'react-iframe';

export default function Miscelaneo(){
    useEffect(() => {
        document.title = "Infinite - Mi Pais"
      }, [])
    return (
        <div>
            <Layout title="Mi Pais">     
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