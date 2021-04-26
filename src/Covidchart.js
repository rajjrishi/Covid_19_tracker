import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

function Covidchart(){
    const [hdata,setHdata] = useState([]);
    const [ddata,setDdata] = useState([]);
    const [rdata,setRdata] = useState([]);

    const buildChartData = (data , casesType = "cases") => {
        const chartData = [];
        let lastDataPoint;
        for( let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((res) => res.json() )
        .then((rishi) => {
            const hhdata = buildChartData(rishi);
            setHdata(hhdata);
            /*const rrdata = buildChartData(rishi,'recovered');
            setRdata(rrdata);
            const dddata = buildChartData(rishi,'deaths');
            setDdata(dddata);*/
        });
        
    }, [])

    

    const data = {
        datasets : [
            {
                label : 'Cases',
                data : hdata
            },
            {
                label : 'Recovered',
                data : rdata
            },
            {
                label : 'Deaths',
                data : ddata
            }
        ]
    }

    return <Line data={data} />
}

export default Covidchart;