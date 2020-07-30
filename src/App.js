import React, {useMemo, useState} from 'react';
import logo from './logo.svg';
import Login from './paginas/Login/Login';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import {CambiarEstados} from "./contexts/CambiarEstados";
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

function App() {
  const [cambiarEstados, setCambiarEstados] = useState('sb-nav-fixed');

    const value = useMemo(()=> ({cambiarEstados, setCambiarEstados}), [cambiarEstados, setCambiarEstados])

  return (
    <BrowserRouter>
  <div>
      <CambiarEstados.Provider value={value}>
      <Switch>
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
      </Switch>
      </CambiarEstados.Provider>
  </div>
  </BrowserRouter>
  );
}

export default App;
