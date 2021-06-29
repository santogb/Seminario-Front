import React, { useEffect } from "react";
import "./tips.scss";

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

class Tips extends React.Component {
  render() {
    const cardsData = [
      {
        id: 1,
        title: "BICICLETA",
        content: "Intentar utilizar más la bicicleta para desplazarnos, cuando no se requiera obligatoriamente utilizar el coche, ya que el automóvil emite gases de efecto invernadero (CO2, CO y acetileno).",
        imgUrl: "https://www.concienciaeco.com/wp-content/uploads/2015/02/bici-si-def.png"
      },
      {
        id: 2,
        title: "APAGAR LA LUZ",
        content: "Esto se debe aplicar siempre cuando no estés en la habitación en la que hayas dejado encendida la luz o cuando haya suficiente luz natural.",
        imgUrl: "https://www.concienciaeco.com/wp-content/uploads/2015/02/Apagar-la-luz-al-salir-de-la-habitación.png"
      },
      {
        id: 3,
        title: "LUZ SOLAR",
        content: "Aprovechar al máximo la luz natural en las actividades diarias y así, de paso, poder evitar un uso irracional de la luz artificial.",
        imgUrl: "https://www.intramed.net/userfiles/2014/images/luzSolar.jpg"
      },
      {
        id: 4,
        title: "STAND BY",
        content: "Esta función te permite apagarlo con el control remoto, ya que no sólo le produce un desgaste al equipo sino que además consume energía innecesariamente. Encenderlo sólo cuando vaya a ser utilizado (se ha comprobado que el 40% del tiempo en que la tele está encendida no se está viendo).        ",
        imgUrl: "https://www.concienciaeco.com/wp-content/uploads/2015/02/apagar-tv.png"
      },
      {
        id: 5,
        title: "EFICIENCIA ENERGETICA",
        content: "Si compras algún electrodoméstico nuevo o deseas reformar tu cocina, debes eligir un modelo eficiente y ecológico de clase A+++, que permiten ahorrar más del 45% de energía respecto de los de clase D.",
        imgUrl: "https://www.concienciaeco.com/wp-content/uploads/2015/02/consumo-bajo-de-energ%C3%ADa.jpg"
      },
    ];

    return (
      <div className="container">
        <CardContainer cards={cardsData} />
      </div>
    );
  }
}

export default Tips;
