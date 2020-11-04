/****************************************************************************************
*@file MapGoogle.js
*@author  (breydi vasquez )
*@date 13-10-2020 
*@description Componente Google maps 
*****************************************************************************************/
import React, { useState, useRef, useCallback, useContext } from "react";
import {
  LoadScript,
  GoogleMap,
  DrawingManager,
  Polygon,
  Marker
} from "@react-google-maps/api";

import './styles/styleGeneral.css'
import {Coordinates} from "../contexts/Coordinates";
// const API_KEY = "AIzaSyBphb5bMbCtAusDt1nlkgDkWqldcJK5OsE";
const API_KEY = "AIzaSyCYke1oESLVfrWEeYf-1K2SZTYoq1Z-CWw";

const center = {
  lat: 26.598716877829,
  lng: -80.202987553652
};

const libraries = ["drawing"];

const options = {
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["polygon"]
  },
  polygonOptions: {
    fillColor: `#2196F3`,
    strokeColor: `#2196F3`,
    fillOpacity: 0.5,
    strokeWeight: 2,
    clickable: true,
    editable: true,
    draggable: true,
    zIndex: 1
  }
};

const MapGoogle = () => {
  const {coordinates, setCoordinates} = useContext(Coordinates)  
  const [path, setPath] = useState([]);  
  const [state, setState] = useState({
    drawingMode: "polygon"
  });

  const noDraw = () => {
    setState(function set(prevState) {
      return Object.assign({}, prevState, {
        drawingMode: "maker"
      });
    });
  };

  const onPolygonComplete = React.useCallback(function onPolygonComplete(poly) {
    const polyArray = poly.getPath().getArray();
    let paths = [];
    polyArray.forEach(function(path) {
      paths.push({ lat: path.lat(), lng: path.lng() });
    });
    setPath(paths);   
    console.log("onPolygonComplete", paths);
    setCoordinates(paths); 
    noDraw();
    poly.setMap(null);
  }, []);

  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);
  
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);
  
  return (
    <div className="App-map-google">
        <button
        style={{
          position:'sticky',
          top: "550px",          
          width: '80px',
          height: '40px',
          zIndex: 100
        }}
        onClick={(e) => { e.preventDefault()
           setPath([])
          }}
      >
        Clear
      </button>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={API_KEY}
        libraries={libraries}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="App-map-google-2"
          center={center}
          zoom={10}
          version="weekly"
        >
          {path.length === 0 ? (
            <DrawingManager
              drawingMode={state.drawingMode}
              options={options}
              onPolygonComplete={onPolygonComplete}
              editable
              draggable
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            />
          ) : (
            <Polygon
              options={{
                fillColor: `#2196F3`,
                strokeColor: `#2196F3`,
                fillOpacity: 0.5,
                strokeWeight: 2
              }}
              editable
              draggable
              path={path}
              onMouseUp={onEdit}              
              onDragEnd={onEdit}
              onLoad={onLoad}
              onUnmount={onUnmount}
            />
          )}
          {path.map((pos, key) => {            
            return <Marker key={key} label={"" + key} position={pos} />;
          })}
        </GoogleMap>
      </LoadScript>
      {path.map((pos, key) => {
        return (
          <div key={key}>

            <div>
              <div
                
                key={"lat" + key}
                label="Latitude"
                type="text"
                value={pos.lat}
                disabled={true}
              />
              <div
                
                key={"lng" + key}
                label="Longitude"
                type="text"
                value={pos.lng}
                disabled={true}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MapGoogle;
