/****************************************************************************************
*@file FormLogCall.js
*@author  (Maylee Perez Pastor)
*@date 12-08-2020 
*@description Componente Add FormLogCall
*****************************************************************************************/

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../../components/styles/formLogin.css";
import "../../components/styles/stylesMenu.css";
import "../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css";
// import Footer from "../../components/Footer";
import FormLogCall from "./FormLogCall";
import FormSendText from "./FormSendText";
import FormSendEmail from "./FormSendEmail";
import FormAddNote from "./FormAddNote";
import FormEAlerts from "./FormEAlerts";
import FormActionPlants from "./FormActionPlants";
/*
import { AddUser } from './AddUser'
import { AddTeam } from './AddTeam' */


const ContenidoCorrespondencia = () => {
  
  /*  */const [buttonType, setButtonType] = useState()  
  
  const mystyle = {
    fontSize: 30,
    fontWeight: 'bold'
  }
  /* useEffect(() => {
    let path = window.location.pathname
    if(path==='/Agents'){
      setButtonType('agent') 
    }else if(path==='/Agents/Teams'){
      setButtonType('team') 
    }else{
      setButtonType('') 
    }
  },[]);
*/
  const onTypeAdd = (e) => {
      setButtonType(e.target.name) 
  } 

  return (
    <div >
     
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <div className="collapse navbar-collapse" id="navbarText"> */}
              <ul className="nav nav-tabs">
                <li className="nav-item active">
                  <Link to="/LeadCommandCenter/FormLogCall" className="nav-link " name="agent" onClick={onTypeAdd}>Log Call</Link>
                </li>
                <li className="nav-item">
                  <Link to="/LeadCommandCenter/FormSendText" className="nav-link " name="team" onClick={onTypeAdd} >Send Text</Link>
                </li>
                <li className="nav-item">
                  <Link to="/LeadCommandCenter/FormSendEmail" className="nav-link"   name="lrouting" onClick={onTypeAdd}>Send Email</Link>
                </li>
                <li className="nav-item">
                  <Link to="/LeadCommandCenter/FormAddNote" className="nav-link"   name="lrouting" onClick={onTypeAdd}>Add Note</Link>
                </li>
                <li className="nav-item">
                  <Link to="/LeadCommandCenter/FormEAlerts" className="nav-link"   name="lrouting" onClick={onTypeAdd}>E-Alerts</Link>
                </li>
                <li className="nav-item">
                  <Link to="/LeadCommandCenter/FormActionPlants" className="nav-link"   name="lrouting" onClick={onTypeAdd}>Action Plants</Link>
                </li>
              </ul>
            {/* </div>             */}
          </nav>
          <div>            
          </div>

          <Switch>
            <Route path="/LeadCommandCenter/FormLogCall" component={FormLogCall} />
            <Route path="/LeadCommandCenter/FormSendText" component={FormSendText} />
            <Route path="/LeadCommandCenter/FormSendEmail" component={FormSendEmail} />
            <Route path="/LeadCommandCenter/FormAddNote" component={FormAddNote} />
            <Route path="/LeadCommandCenter/FormEAlerts" component={FormEAlerts} />
            <Route path="/LeadCommandCenter/FormActionPlants" component={FormActionPlants} />
          </Switch>
        </div>
      </Router>

     
    </div>
  );
};
export default ContenidoCorrespondencia;
