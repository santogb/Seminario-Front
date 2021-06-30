import React from "react";
import JoyRide from "react-joyride";


// Tour steps
const TOUR_STEPS = [
    {
      target: ".Estimados",
      content: "Aca puedem ver cuanto CO2 genero y su relacion al mes anterior."
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