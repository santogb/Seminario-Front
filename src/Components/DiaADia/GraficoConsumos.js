import React, { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import Moment from 'moment'

export default class GraficoConsumos extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    const xLabels = [];
    const datos = [];
    console.log(this.props.GraphData);
    
    this.props.GraphData?.map((consumo) => datos.push(consumo.consumo));   

    var chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        maintainAspectRatio:false,
    };
    this.props.GraphData?.map((consumo) => xLabels.push(Moment(consumo.fechaYHora, this.props.originDateFormat).format(this.props.showDateFormat)));
    

    return <div>
            <Line
                data={{
                    labels:xLabels,
                    datasets:[
                        {                
                            label: this.props.label,            
                            data:datos,
                            backgroundColor: '#000000',
                        }
                    ]
                }}
                height={200}
                width={600}
                options={chartOptions}
            />
        </div>
    }

}