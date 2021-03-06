import React, {useEffect,useMemo, useState} from 'react';
import './components/styles/styleGeneral.css';
import Login from './paginas/Login/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LeadCommandCenter from './paginas/LeadCommandCenter/LeadCommandCenter';
import CommandInfo from './paginas/LeadCommandCenter/CommandInfo';
import Calendar from './paginas/Calendar/Calendar';
import NotFound from './paginas/NotFound/NotFound';
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
import {ReloadComponent} from "./contexts/ReloadComponent";
import {Coordinates} from "./contexts/Coordinates";
import {Redirect} from "react-router-dom";
import PxpConfig from './Config/DatosGenerales';

import Listings from './paginas/Listings/Listings';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


PxpClient.init(PxpConfig.config.host,
               PxpConfig.config.baseUrl,
               PxpConfig.config.mode
             );

function App() {
  /*Esta Variable es la que mandara el inicio de sesion*/
  const [reloadComponent, setReloadComponent] = useState();
  const [userContext, setUserContext] = useState();
  const [cambiarEstados, setCambiarEstados] = useState(false);
  const [coordinates, setCoordinates] = useState();
  const value = useMemo(()=> ({userContext, setUserContext}), [userContext, setUserContext]);
  const menu = useMemo(()=> ({cambiarEstados, setCambiarEstados}), [cambiarEstados, setCambiarEstados]);
  const reload = useMemo(()=> ({reloadComponent, setReloadComponent}), [reloadComponent, setReloadComponent]);
  const map = useMemo(()=> ({coordinates, setCoordinates}), [coordinates, setCoordinates]);
  /*****************************************************/
  useEffect(() => {
    PxpClient.onAuthStateChanged((user) => {
      if (user) {
        setUserContext({user:user});
        /* setCambiarEstados(true) */
      } else {
        setUserContext(null);
        /* setCambiarEstados(false) */
      }

    });
    }, []);


  return (
    <BrowserRouter >   
    {userContext === null && <Redirect to="/" />}
    <ReloadComponent.Provider value={reload}>
    <CambiarEstados.Provider value={menu}>
    <UserContext.Provider value={value}>
    <Coordinates.Provider value={map}>
    <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/LeadCommandCenter" component={LeadCommandCenter}/>
            <Route path="/CommandInfo/Lead:id_lead" component={CommandInfo}/>
            <Route path="/Calendar" component={Calendar}/>
            <Route path="/Oportunities" component={Oportunities}/>
            <Route path="/GreatSheet" component={GreatSheet}/>
            <Route path="/FeaturedListings" component={FeaturedListings}/>
            <Route path="/Import" component={Import}/>
            <Route path="/Marketing" component={Marketing}/>
            <Route path="/Agents" component={Agents}/>
            <Route path="/Listings" component={Listings}/>
            <Route path="/Reports" component={Reports}/>
            <Route path="/Settings" component={Settings}/>
            <Route path="/NotFound" component={NotFound} />
            <Route path="*" component={NotFound} />
      </Switch>
      </Coordinates.Provider>
      </UserContext.Provider>
      </CambiarEstados.Provider>
      </ReloadComponent.Provider>   
    </BrowserRouter>
  );
}

export default App;
