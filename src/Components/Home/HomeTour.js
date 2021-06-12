import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
      target: ".Home-Consumo-CO",
      content: "Aca puedem ver cuanto CO2 genero y su relacion al mes anterior."
    },  
    {
        target: ".Home-Consumo-Arboles",
        content: "Consumiendo energia generamos mas y mas CO2, aca puede ver el equivalente a arboles."
    },  
    {
        target: ".Home-Consumo-Graph",
        content: "Este es el esfuerzo de nuestra comunidad"
    }, 
  ];
  
  // Tour component
  const Tour = () => {
    return (
      <>
        <JoyRide steps={TOUR_STEPS} continuous={true} />
      </>
    );
  };
  
  export default Tour;