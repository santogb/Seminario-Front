import React, { useEffect } from "react";
import "./tips.scss";
import { listarInfiniTips} from '../../Services/infiniTipsService';

const Card = (props) => (
  <div className="card">
    <img src={props.imgUrl} alt={props.alt || "Image"} />
    <div className="card-content">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  </div>
);

const CardContainer = (props) => (
  <div className="cards-container">
    {props.cards.map((card) => (
      <Card title={card.title} content={card.content} imgUrl={card.imgUrl} />
    ))}
  </div>
);

export default function Tips(){
  const [isLoadingTips, setIsLoadingTips] = React.useState(false); 
  const [tips, setTips] = React.useState(null);

  const recargarInfiniTips = () => {
    setIsLoadingTips(true);
    listarInfiniTips()
      .then((response) => {             
        setTips(response.data);
        setIsLoadingTips(false);
      });
  };
  if (tips === null && !isLoadingTips) {
    recargarInfiniTips();
  }
  
  console.log(tips !== null);
  return (
    <div className="container">
      {!isLoadingTips && tips !== null && <CardContainer cards={tips} />}
    </div>
  );
}
