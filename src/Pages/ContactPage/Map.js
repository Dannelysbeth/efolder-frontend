import { useMemo } from "react";
import React, { Component }  from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./ContactPage.css"

export default function Home(){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey: "AIzaSyCgXLZwFSZDUhmJtg0Kv5ALjWBlA9v-yyw",
    });

    if(!isLoaded)return <div>Loading...</div>;
    return <Map/>

}

function Map(){
    const center={lat: 50.3929187, lng:18.8371872};
    return <GoogleMap zoom={10} center={center} mapContainerClassName="map">
        <Marker position={center}/>
    </GoogleMap>;
}

