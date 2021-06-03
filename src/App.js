import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {MenuItem,FormControl,Select,Card, CardContent} from '@material-ui/core';
import Infobox from './Infobox';
import Table from './Table';
import Covidchart from './Covidchart';
import 'leaflet/dist/leaflet.css';
import Map from './Map';
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";

function App() {
  const [countries,setCountries]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState('Worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  const [tabledata,setTabledata]=useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all"; 
    fetch(url)
    .then((response) => (response).json())
    .then(data => setCountryInfo(data) )
  }, [])

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res)=>(res).json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country
          }));
          
          const sorted = data.sort((x,y) => y.cases - x.cases);
          setCountries(countries);
          setTabledata(sorted);
          setMapCountries(data);
      });
    };

    getCountriesData();
  }, []);

  const onCountrychange = (event) => {
    const countrycode = event.target.value;

    const url =
    countrycode === "Worldwide" ? 
    "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    fetch(url)
    .then((response) => (response).json())
    .then(data => {
      setSelectedCountry(countrycode);
      setCountryInfo(data);
      setMapCenter([data.lat, data.long]);
      setMapZoom(4);
    } )
  };

  
   return (
     <>
     <div className="app">
     <div className="app_left">
       <div className="app_header">
         <h1>COVID 19 TRACKER</h1>
         <FormControl className="app_dropdown">
           <Select variant="outlined" onChange={onCountrychange} value={selectedCountry} className="app_selection">
           <MenuItem value='Worldwide' ><div className="app_drop_menu">Worldwide</div></MenuItem>
             {countries.map((country) => <MenuItem value={country.name}>{country.name}</MenuItem>)}
           </Select>
         </FormControl>
       </div>
       <div className="app_stats">
          <Infobox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
       <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
       <div className="app_charts">
         <div className="app_chart_cases"><div className="app_chart_heading"><b>Worldwide New Cases</b></div><Covidchart casesType="cases"></Covidchart></div>
         <div className="app_chart_recovered"><div className="app_chart_heading"><b>Worldwide Recoveries</b></div><Covidchart casesType="recovered"></Covidchart></div>
         <div className="app_chart_deaths"><div className="app_chart_heading"><b>Worldwide New Deaths</b></div><Covidchart casesType="deaths"></Covidchart></div>
       </div> 
    </div>
    <Card>
      <div className="app_right">
      <CardContent>
        <div className="app_information">
        <h3>Live cases by country</h3>
        <Table countries={tabledata}></Table>
        </div>
      </CardContent>
      </div>
    </Card>
     </div>
     </>
   )
}

export default App;
