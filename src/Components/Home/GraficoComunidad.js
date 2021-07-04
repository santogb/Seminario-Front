import React, { Component } from 'react';
import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 

CanvasJS.addCultureInfo("es",
                {
                    decimalSeparator: ".",
                    digitGroupSeparator: ",",
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
               });
class GraficoComunidad extends Component {
		constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.addSymbols = this.addSymbols.bind(this);
	}
	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix + '';
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			culture:  "es",
			colorSet: "colorSet1",
			title: {
				fontColor: "darkgreen"
			},
			axisX: {
				valueFormatString: "MMMM",
				labelAngle: -30,
				intervalType: "month",
				interval: 1
			},
			axisY: {
				prefix: "",
				labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: "column",
				name: "kWh por vivienda",
				showInLegend: true,
				xValueFormatString: "MMMM YYYY",
				yValueFormatString: "#,##0",
				dataPoints: [
					{ x: new Date(2021, 0), y: 230 },
					{ x: new Date(2021, 1), y: 300 },
					{ x: new Date(2021, 2), y: 270 },
					{ x: new Date(2021, 3), y: 320 },
					{ x: new Date(2021, 4), y: 400 },
					{ x: new Date(2021, 5), y: 380 },
					{ x: new Date(2021, 6), y: 330 },
					{ x: new Date(2021, 7), y: 270 },
					{ x: new Date(2021, 8), y: 290 },
					{ x: new Date(2021, 9), y: 295 },
					{ x: new Date(2021, 10), y: 300 },
					{ x: new Date(2021, 11), y: 303 }
				]
			},{
				type: "line",
				name: "Cantidad de Usuarios",
				showInLegend: true,
				yValueFormatString: "#,##0",
				dataPoints: [
					{ x: new Date(2021, 0), y: 38 },
					{ x: new Date(2021, 1), y: 77 },
					{ x: new Date(2021, 2), y: 95 },
					{ x: new Date(2021, 3), y: 107 },
					{ x: new Date(2021, 4), y: 112 },
					{ x: new Date(2021, 5), y: 116 },
					{ x: new Date(2021, 6), y: 131},
					{ x: new Date(2021, 7), y: 208 },
					{ x: new Date(2021, 8), y: 222 },
					{ x: new Date(2021, 9), y: 285},
					{ x: new Date(2021, 10), y: 338 },
					{ x: new Date(2021, 11), y: 367 }
				]
			},{
				type: "area",
				name: "Árboles salvados",
				markerBorderColor: "white",
				markerBorderThickness: 2,
				showInLegend: true,
				yValueFormatString: "#,##0",
				dataPoints: [
					{ x: new Date(2021, 0), y: 48 },
					{ x: new Date(2021, 1), y: 63 },
					{ x: new Date(2021, 2), y: 70 },
					{ x: new Date(2021, 3), y: 73 },
					{ x: new Date(2021, 4), y: 80 },
					{ x: new Date(2021, 5), y: 80 },
					{ x: new Date(2021, 6), y: 70 },
					{ x: new Date(2021, 7), y: 85 },
					{ x: new Date(2021, 8), y: 130 },
					{ x: new Date(2021, 9), y: 160 },
					{ x: new Date(2021, 10), y: 165 },
					{ x: new Date(2021, 11), y: 170 }
				]
			}]
		}
		
		return (
		<div>
			<h1>Avance de la comunidad de Infinites! </h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default GraficoComunidad;