import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
      target: ".PorHora",
      content: "Este grafico muestra su consumo en w por hora."
    },  
    {
        target: ".PorDia",
        content: "Este grafico muestra su consumo en w por dia."
    },  
  ];
  
  // Tour component
  const Tour = (props) => {
    return (
      <>
        <JoyRide steps={TOUR_STEPS} continuous={true} run={props.run}/>
      </>
    );
  };
  
  export default Tour;