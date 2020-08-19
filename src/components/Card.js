import React from 'react';
import './styles/card.css';
import {BrowserRouter as Router, NavLink, Link, Route, Switch} from 'react-router-dom';
import AllActivityList from "./AllActivityList";
import CallList from "./CallList";
import TextList from "./TextList";
import EmailList from "./EmailList";
import PropertyList from "./PropertyList";
import { Tab, Icon, Menu, Label, Input } from 'semantic-ui-react';

import edit_icon from '../image/edit_icon.png';
import phone_icon from '../image/phone.png';
import mensaje_icon from '../image/mensaje.png';
import chat_icon from '../image/chat.png';
import net_icon from '../image/net.png';

import FormLogCall from "../paginas/LeadCommandCenter/FormLogCall";
import FormSendText from "../paginas/LeadCommandCenter/FormSendText";
import FormSendEmail from "../paginas/LeadCommandCenter/FormSendEmail";
import FormAddNote from "../paginas/LeadCommandCenter/FormAddNote";
import FormEAlerts from "../paginas/LeadCommandCenter/FormEAlerts";
import FormActionPlants from "../paginas/LeadCommandCenter/FormActionPlants";

const Card = (props) => {

  const panes = [
    {
      menuItem: 'All Activities',
      render: () => <Tab.Pane attached={false}>
        <AllActivityList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='call'>
          <Icon name="call"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <CallList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='text'>
          <Icon name="comment"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <TextList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='email'>
          <Icon name="mail"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <EmailList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem:  (
        <Menu.Item key='property'>
          <Icon name="world"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <PropertyList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
      {
          menuItem:  (
              <Menu.Item key='search'>
                  <Input icon='search' placeholder='Search...' />
              </Menu.Item>
          ),
          render: () => <Tab.Pane attached={false}>
              <PropertyList
                  id_lead = {props.id_lead}
                  lead_name = {props.nombre}
              />
          </Tab.Pane>,
      }
  ];

  return (

            <div className="container-fluid" id="contenedorPrincipalCardPersonal">
            <div className="row">
                <div className="col-sm-4" id="ContenidoInfo">
                  <div className="row" id="contenido">
                      <div className="col-sm-12">
                        <div className="card" id="CardPesonal">
                          <h1>
                            <img id="ImagenAvatar" src={props.foto} className="card-img-top img-fluid rounded" alt="Avatar"/><b id="TituloCard">{props.nombre}</b>
                          </h1>
                          <div className="card-body" id="CuerpoCard">
                          <div className="input-group" id="InputForm">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <button className="dropdown-item" type="button">2 Way Phone</button>
                              <button className="dropdown-item" type="button">Valid Number</button>
                              <button className="dropdown-item" type="button">Unknown</button>
                              <button className="dropdown-item" type="button">Do Not Call</button>
                              <button className="dropdown-item" type="button">Opted-Out</button>
                              <button className="dropdown-item" type="button">Wrong Number</button>
                            </div>
                            <NavLink className="nav-link" to="#" id="TextPesonalCard">{props.telefono}</NavLink>
                          </div>
                          <div className="input-group" id="InputForm">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <button className="dropdown-item" type="button">Valid Address</button>
                              <button className="dropdown-item" type="button">Unknown</button>
                              <button className="dropdown-item" type="button">2-Way Emailing</button>
                              <button className="dropdown-item" type="button">Opted-Out</button>
                              <button className="dropdown-item" type="button">Invalid Address</button>
                            </div>
                            <NavLink className="nav-link" to="#" id="TextPesonalCard">{props.correo}</NavLink>
                          </div>
                            <center><NavLink className="nav-link" to="#" id="TextPesonalCard">{props.type_lead}</NavLink></center>
                          </div>
                          <div className="accordion" id="accordionExample">
                            <div className="card">
                              <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    EXECUTIVE SUMMARY
                                  </button>
                                </h2>
                              </div>

                              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    2/11 - Sent text!
                                    12/13 - Sent text!
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    CALL GOAL
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div className="card-body">
                                  Overdue
                                  Call now!
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingThree">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    TASKS
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div className="card-body">
                                  TASKS
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingFour">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                    APPOINTMENTS
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                <div className="card-body">
                                  Add appoinment
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingThree">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                    DETAILS
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseFive" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div className="card-body">                               
                                Registered:06/18/2020
                                Source: Great Agent Lead Package
                                Primary Agent: Mariah Gonzales
                                Listing Agent: Jonathan Santiago
                                Lender: Assign
                                Close Date: Add
                                Birthday: Add

                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingSix">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                    TAGS
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                <div className="card-body">
                                + Add New Tag
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingSeven">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                                    OPPORTUNITIES
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                                <div className="card-body">
                                  Add New Opportunity
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingEight">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseThree">
                                    FILES
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
                                <div className="card-body">
                                  Add New Files
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingNine">
                                <h2 className="mb-0">
                                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseThree">
                                    CUSTOM FIELDS
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#accordionExample">
                                <div className="card-body">
                                CUSTOM FIELDS
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-sm-8" id="ContenidoCorrespondenciaGeneral">
                  <div className="row">
                      <div className="col-sm-12">
                        <div className="card" id="ContenidoCorrespondencia">
                          <div className="card-body" id="CuerpoCorrespondecia">
                            <div>

                              <Router>
                                <div>
                                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                    {/* <div className="collapse navbar-collapse" id="navbarText"> */}
                                    <ul className="nav nav-tabs">
                                      <li className="nav-item active">
                                        <Link to="/LeadCommandCenter/FormLogCall" className="nav-link" aria-selected="true" name="logCall">Log Call</Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link to="/LeadCommandCenter/FormSendText" className="nav-link" aria-selected="false" name="sendText">Send Text</Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link to="/LeadCommandCenter/FormSendEmail" className="nav-link"  aria-selected="false" name="SedEmail">Send Email</Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link to="/LeadCommandCenter/FormAddNote" className="nav-link" name="addNote">Add Note</Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link to="/LeadCommandCenter/FormEAlerts" className="nav-link" name="Alerts">E-Alerts</Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link to="/LeadCommandCenter/FormActionPlants" className="nav-link" name="actionPlants">Action Plants</Link>
                                      </li>
                                    </ul>

                                    {/* </div>             */}
                                  </nav>
                                  <div>
                                  </div>

                                  <Switch>
                                    {/* <Route path="/LeadCommandCenter/FormLogCall" component={FormLogCall} exact={true}/> */}
                                    <Route path="./Componets/Card" component={FormLogCall} exact={true}/>
                                    <Route path="/LeadCommandCenter/FormSendText" component={FormSendText}/>
                                    <Route path="/LeadCommandCenter/FormSendEmail" component={FormSendEmail}/>
                                    <Route path="/LeadCommandCenter/FormAddNote" component={FormAddNote}/>
                                    <Route path="/LeadCommandCenter/FormEAlerts" component={FormEAlerts}/>
                                    <Route path="/LeadCommandCenter/FormActionPlants" component={FormActionPlants}/>
                                    <FormLogCall telefono={props.telefono} />
                                  </Switch>
                                </div>
                              </Router>


                            </div>

                          </div>
                        </div>
                        <div className="activity-content">
                          <Tab menu={{ attached: false }} panes={panes} />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            </div>

  );
}
export default Card;
