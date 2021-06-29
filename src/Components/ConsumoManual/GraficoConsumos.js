import React from "react";
import { Bar } from 'react-chartjs-2';
import Moment from 'moment'

export default class GraficoConsumos extends React.Component {
    constructor(props) {
         super(props);
    }

    render() {
    const xLabels = [];
    const datos = [];
    
    this.props.GraphData?.map((consumo) => xLabels.push(Moment(consumo.periodo, 'YYYY-MM-DD').format('MMM YYYY')));
    this.props.GraphData?.map((consumo) => datos.push(consumo.consumoTotal));   


    return <div>
            <Bar
                data={{
                    labels:xLabels,
                    datasets:[
                        {
                            label: "Su consumo",
                            data:datos,
                            backgroundColor: '#BDC9D4',
                        }
                    ]
                }}
                height={200}
                width={600}
                options={{
                    maintainAspectRatio:false,
                }}
            />

        </div>
    }

}