/****************************************************************************************
*@file ContenidoMarketing.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente ContenidoMarketing
*****************************************************************************************/

import React from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { SubMarketing } from "./SubMarketing";
import { EmailTemplate } from "./EmailTemplate";
import { MarketingTemplate } from "./MarketingTemplate";
import { TexTemplate } from "./TexTemplate";
import { SavedView } from "./SavedView";
import { CreateAction } from "./CreateAction";

const ContenidoMarketing = (props) => {
  return (
    <div>
      <div className="navbar">
      <div className="col-6">
        <h2>Marketing </h2>      
      </div>      
      </div>
    <div style={{background: '#fff'}}>
      <Router>
        <div >
          <nav className="navbar navbar-expand-lg " >            
              <ul className="nav">
                <li className="nav-item ">
                  <Link to="/Marketing" className="nav-link active"  name="agent" >Action Plans</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Marketing/EmailTemplates"  className="nav-link " name="Email_template" >Email Templates</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Marketing/MarketingTemplates" className="nav-link"   name="marketing_template" >Marketing Templates</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Marketing/TextTemplates" className="nav-link"   name="text_template" >Text Templates</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Marketing/SavedViews" className="nav-link"   name="saved_views" >Saved Views</Link>
                </li>
              </ul>            
          </nav>
          <div>            
          </div>

          <Switch>
            <Route path="/Marketing" component={SubMarketing} exact={true} />
            <Route path="/Marketing/EmailTemplates" component={EmailTemplate} />
            <Route path="/Marketing/MarketingTemplates" component={MarketingTemplate} />
            <Route path="/Marketing/TextTemplates" component={TexTemplate} />
            <Route path="/Marketing/SavedViews" component={SavedView} />
            <Route path="/Marketing/CreateAction" component={CreateAction} />
          </Switch>
        </div>
      </Router>
      </div>
    </div>
  );
}
export default ContenidoMarketing;
