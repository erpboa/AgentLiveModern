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

const API_KEY = "AIzaSyDWjkc19pzPq025FAKzAlKyfbLpi3Q8Geo";

const center = {
  lat: 26.598716877829,
  lng: -80.202987553652
};

const libraries = ["drawing", "places"];

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

let urlGeocodeGoogle = 'https://api.geocod.io/v1.6/reverse?api_key=659ccf5578457ac5a4ac755dad54dfaca6cf675'
let data_google = null
let serPlaceGoogle = null
let data_g = {"zc": [], "st": [], "sn": [], "sl": [], "ss": []}
let coords = []
const MapGoogle = ({onFilterMap, onFilterMapClear}) => {
  const {coordinates, setCoordinates} = useContext(Coordinates)  
  const [path, setPath] = useState([]);  
  
  const [state, setState] = useState({
    drawingMode: "polygon"
  });

  const reverseGeocodi = async (lt, ln) => {    
        
    const consult = await fetch(`https://api.geocod.io/v1.6/reverse?q=${lt},${ln}&api_key=659ccf5578457ac5a4ac755dad54dfaca6cf675`, {method: 'GET'})
    const resp = await consult.json()
    const value = await resp.results     
      value.map(e => {             
        data_g.zc.push(e.address_components.zip)
        data_g.st.push(e.address_components.number)
        data_g.sn.push(e.address_components.formatted_street)
        data_g.sl.push(e.address_components.city)
        data_g.ss.push(e.address_components.state) 
        coords.push({lat: e.location.lat, lng: e.location.lng})                              
    })                
    
  }

  const onService = (location) => {
    serPlaceGoogle.nearbySearch({
      location: location,
      radius: 2000,
      query: '',
      types: ['street_address'|'route'|'street_number'] 
    }, callback);
  }
  function callback(results, status) {    
    if(status=='OK'){
      results.map(e => {        
        // console.log("service",e.vicinity);
        reverseGeocodi(e.geometry.location.lat(), e.geometry.location.lng())        
        coords.push({lat: e.geometry.location.lat(), lng: e.geometry.location.lng()})        
      })
    }
  }
  
  const onSfetch = p => {
  p.map(e => {
    onService(e)
  })
}
  const onGetGeocode = async (a) => {    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(a);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw      
    };    
    const resp = await fetch(urlGeocodeGoogle, requestOptions)
    const re = await resp.json()
    const value = await re.results          
    value.map(e => {
      e.response.results.map( d => {        
        data_g.zc.push(d.address_components.zip)
        data_g.st.push(d.address_components.number)
        data_g.sn.push(d.address_components.formatted_street)
        data_g.sl.push(d.address_components.city)
        data_g.ss.push(d.address_components.state) 
      })
    })
    
  }
  
  const onQuitSimilar = (d) => {
      const pc = d.zc.filter(function(item, index, array) {
          return array.indexOf(item) === index;
      })
      const st = d.st.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })
      const sn = d.sn.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })
      const sl = d.sl.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })
      const ss = d.ss.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })      

      data_google = {"postal_code": pc, "street_number": st, "street_name": sn, "locality": sl, "state": ss}
      
  }
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
    data_g.sl.length = 0
    data_g.sn.length = 0
    data_g.ss.length = 0
    data_g.st.length = 0
    data_g.zc.length = 0
    const markersp = []
    polyArray.forEach(function(path) {
      paths.push({ lat: path.lat(), lng: path.lng() });      
      markersp.push(`${path.lat()}, ${path.lng()}`)
    });
    
    // paths.map(e => {
    //   markersp.push(`${e.lat}, ${e.lng}`)
    // })
    onSfetch(paths)
    onGetGeocode(markersp) 
    setPath(paths);             
    setCoordinates(data_g);         
    noDraw();
    poly.setMap(null);
    setTimeout(() => {      
      onQuitSimilar(data_g);
      onFilterMap(data_google)
     }, 1000);
    
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
           coords.length=0
           onFilterMapClear()            
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
          onLoad={ map => {
            serPlaceGoogle= new window.google.maps.places.PlacesService(map);             
          }}                  
        >
        {/* {
          coords.map((pos, key) => {            
            return <Marker key={key}  position={pos}
            icon={{ url: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-1/254000/72-512.png', 
            size: {width: 30, height: 30}, anchor: {x: 15, y: 20}, scaledSize: {width: 15, height: 15}, }}
            // onClick={() => handleToggleOpen(i)}
             />;
          })
          }           */}
          
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
