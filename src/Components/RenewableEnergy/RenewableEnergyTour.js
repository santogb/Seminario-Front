import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
      target: "#chart-eolico dx-chart",
      content: "Aca puedem ver cuanto CO2 genero y su relacion al mes anterior."
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