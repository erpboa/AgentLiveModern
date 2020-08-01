import React, {useEffect,useMemo, useState} from 'react';
import logo from './logo.svg';
import Login from './paginas/Login/Login';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import Dashboard from './paginas/Dashboard/Dashboard';
import Calendar from './paginas/Calendar/Calendar';
import Oportunities from './paginas/Oportunities/Oportunities';
import GreatSheet from './paginas/GreatSheet/GreatSheet';
import FeaturedListings from './paginas/FeaturedListings/FeaturedListings';
import Import from './paginas/Import/Import';
import Marketing from './paginas/Marketing/Marketing';
import Agents from './paginas/Agents/Agents';
import Reports from './paginas/Reports/Reports';
import Settings from './paginas/Settings/Settings';
import PxpClient from 'pxp-client';
import {UserContext} from "./contexts/UserContext";
import {CambiarEstados} from "./contexts/CambiarEstados";
import {Redirect} from "react-router-dom";
import PxpConfig from './Config/DatosGenerales';

console.log("llamar variables",PxpConfig.config.active);

PxpClient.init(PxpConfig.config.host,
               PxpConfig.config.baseUrl,
               PxpConfig.config.mode
             );

function App() {
  /*Esta Variable es la que mandara el inicio de sesion*/
  const [userContext, setUserContext] = useState();
  const [cambiarEstados, setCambiarEstados] = useState();
  const value = useMemo(()=> ({userContext, setUserContext}), [userContext, setUserContext]);
  const menu = useMemo(()=> ({cambiarEstados, setCambiarEstados}), [cambiarEstados, setCambiarEstados]);
  /*****************************************************/
  useEffect(() => {
    PxpClient.onAuthStateChanged((user) => {
      if (user) {
        setUserContext({user:user});
        setCambiarEstados('sb-nav-fixed')
      } else {
        setUserContext(null);
        setCambiarEstados('sb-nav-fixed')
      }

    });
    }, []);




  return (
    <BrowserRouter>
  <div>
  {userContext === null && <Redirect to="/" />}
  <CambiarEstados.Provider value={menu}>
  <UserContext.Provider value={value}>
          <Route path="/" component={Login} exact={true}/>
          <Route path="/Dashboard" component={Dashboard}/>
          <Route path="/Calendar" component={Calendar}/>
          <Route path="/Oportunities" component={Oportunities}/>
          <Route path="/GreatSheet" component={GreatSheet}/>
          <Route path="/FeaturedListings" component={FeaturedListings}/>
          <Route path="/Import" component={Import}/>
          <Route path="/Marketing" component={Marketing}/>
          <Route path="/Agents" component={Agents}/>
          <Route path="/Reports" component={Reports}/>
          <Route path="/Settings" component={Settings}/>
    </UserContext.Provider>
    </CambiarEstados.Provider>
  </div>
  </BrowserRouter>
  );
}

export default App;
