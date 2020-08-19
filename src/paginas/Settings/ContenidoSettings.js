import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../../components/styles/formLogin.css";
import "../../components/styles/stylesMenu.css";
import "../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css";
import Footer from "../../components/Footer";
import { Profile } from "./Profile";
import { Password } from "./Password";
import { Notifications } from "./Notifications";

const ContenidoSettings = (props) => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid">
          <h3>Settings</h3>
          <Router>
            <div id="layoutSidenav">
              
                <nav className="nav flex-column">
                  <Link to="/Settings"  className="nav-link active" >Profile</Link>
                  <Link to="/Settings/Password" className="nav-link" >Password</Link>
                  <Link to="/Settings/Notifications" className="nav-link" >Notifications</Link>
                  <Link to="/Settings/Email_Signature" className="nav-link" >E-mail Signature</Link>
                  <Link to="/Settings/Accountability" className="nav-link" >Accountability</Link>
                  <Link to="/Settings/Company" className="nav-link" >Company</Link>
                  <Link to="/Settings/Branding" className="nav-link" >Branding</Link>
                  <Link to="/Settings/Custom_Field" className="nav-link" >Custom Field</Link>
                  <Link to="/Settings/Lead_Stages" className="nav-link" >Lead Stages</Link>
                  <Link to="/Settings/Poppular_Locations" className="nav-link" >Poppular Locations</Link>
                  <Link to="/Settings/Payment_Settings" className="nav-link" >Payment Settings</Link>
                  <Link to="/Settings/Integrations" className="nav-link" >Integrations</Link>
                  <Link to="/Settings/Leads_Flow" className="nav-link" >Leads Sign-Up Flow</Link>
                </nav>                            

              <Switch>
                <Route path="/Settings" component={Profile} exact={true} />
                <Route path="/Settings/Password" component={Password} />                
                <Route path="/Settings/Notifications" component={Notifications} />                
              </Switch>
            </div>
          </Router>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ContenidoSettings;
