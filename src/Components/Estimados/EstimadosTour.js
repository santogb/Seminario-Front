import React from "react";
import JoyRide from "react-joyride";


// Tour steps
const TOUR_STEPS = [
    {
      target: ".Estimados",
      content: "Tabla de consumos estimas por dispositivo.",
      title: "Consumo Estimado",
    },
    
  ];
  
  // Tour component
  function Tour(props) {

    return (
      <>
        <JoyRide 
        steps={TOUR_STEPS} continuous={true} run={props.run}
        />
      </>
    );
  };
  
  export default Tour;