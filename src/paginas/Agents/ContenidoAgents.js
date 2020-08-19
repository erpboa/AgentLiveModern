import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../../components/styles/formLogin.css";
import "../../components/styles/stylesMenu.css";
import "../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css";
import Footer from "../../components/Footer";
import SubAgent from "./SubAgent";
import Teams from "./Teams";
import LeadRouting from "./LeadRouting";
import { AddUser } from './AddUser'
import { AddTeam } from './AddTeam'


const ContenidoAgents = () => {
  
  const [buttonType, setButtonType] = useState()  
  
  const mystyle = {
    fontSize: 30,
    fontWeight: 'bold'
  }
  useEffect(() => {
    let path = window.location.pathname
    if(path==='/Agents'){
      setButtonType('agent') 
    }else if(path==='/Agents/Teams'){
      setButtonType('team') 
    }else{
      setButtonType('') 
    }
  },[]);

  const onTypeAdd = (e) => {
      setButtonType(e.target.name) 
  }

  return (
    <div id="layoutSidenav_content" >
      <div className="navbar">
      <div className="col-6"><span style={mystyle}>Agent Management </span>
      <a href="http://success.greatagentusa.com//hc/en-us/articles/360010934433-Turning-On-Off-Leads" target="_blank" alt="greatagentusa.com">Learn more about Agent Managemen</a>
      </div>
      { (buttonType === 'agent')? <AddUser /> : (buttonType === 'team')?<AddTeam /> :''}
      </div>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <div className="collapse navbar-collapse" id="navbarText"> */}
              <ul className="nav nav-tabs">
                <li className="nav-item active">
                  <Link to="/Agents" className="nav-link " name="agent" onClick={onTypeAdd}>Agents</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Agents/Teams" className="nav-link " name="team" onClick={onTypeAdd} >Teams</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Agents/LeadRouting" className="nav-link"   name="lrouting" onClick={onTypeAdd}>Lead Routing</Link>
                </li>
              </ul>
            {/* </div>             */}
          </nav>
          <div>            
          </div>

          <Switch>
            <Route path="/Agents" component={SubAgent} exact={true} />
            <Route path="/Agents/Teams" component={Teams} />
            <Route path="/Agents/LeadRouting" component={LeadRouting} />
          </Switch>
        </div>
      </Router>

      <Footer />
    </div>
  );
};
export default ContenidoAgents;
