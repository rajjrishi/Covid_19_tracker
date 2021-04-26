/*import react from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import './map.css';

function Map(){
    return (
        <div className='map'>
            <LeafletMap center={[ 34.80746,-40.4796]} zoom={4}>
            <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            </LeafletMap>
        </div>
    )
}

export default Map;/*

import React from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import "./map.css";
const position = [51.505, -0.09];
function Map() {
    return(
        <div className='map'>
    <LeafletMap center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LeafletMap>
  </div>)
}

export default Map;*/

import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./map.css";

function Map({ center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  );
}

export default Map;