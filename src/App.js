import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {MenuItem,FormControl,Select,Card, CardContent} from '@material-ui/core';
import Infobox from './Infobox';
import Table from './Table';
import Covidchart from './Covidchart';
import 'leaflet/dist/leaflet.css';
import Map from './Map';

function App() {
  const [countries,setCountries]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState('Worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  const [tabledata,setTabledata]=useState([]);
  //const [mapCenter,setMapcenter]=useState({ 34.80746,-40.4796});
  //const [mapzoom,setMapzoom]=useState(3);

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
    } )
  };

  
   return (
     <div className="app">
     <div className="app_left">
       <div className="app_header">
         <h1>COVID 19 TRACKER</h1>
         <FormControl className="app_dropdown">
           <Select variant="outlined" onChange={onCountrychange} value={selectedCountry}>
           <MenuItem value='Worldwide'>Worldwide</MenuItem>
             {countries.map((country) => <MenuItem value={country.name}>{country.name}</MenuItem>)}
           </Select>
         </FormControl>
       </div>
       <div className="app_stats">
         <Infobox nme="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></Infobox>
         <Infobox nme="Coronavirus Recoveries" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></Infobox>
         <Infobox nme="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></Infobox>
       </div>
       <Map center={{ lat: 20.5937, lng: 78.9629 }} zoom={4}/>
    </div>
    <Card className="app_right">
      <CardContent>
        <div className="app_information">
        <h3>Live cases by country</h3>
        <Table countries={tabledata}></Table>
        <h3>Worldwide New cases</h3>
        <Covidchart/>
        </div>
      </CardContent>
    </Card>
     </div>
   )
}

export default App;
