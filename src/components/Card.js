import React from 'react';
import './styles/card.css';
import {BrowserRouter as Router, NavLink, Link, Route, Switch} from 'react-router-dom';
import AllActivityList from "./AllActivityList";
import CallList from "./CallList";
import TextList from "./TextList";
import EmailList from "./EmailList";
import PropertyList from "./PropertyList";
import ActivitiesContainer from "./ActivitiesContainer";
import { Tab, Icon, Menu, Label, Input } from 'semantic-ui-react';

import PropertyProvider from '../contexts/PropertyContext';

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
  return (

            <div className="container-fluid" id="contenedorPrincipalCardPersonal">
            <div className="row">
                <div className="col-sm-4" id="ContenidoInfo">
                  <div className="row" id="contenido">
                      <div className="col-sm-12">
                      <div className="card card-primary card-outline">

                        <div className="card-body box-profile">
                          <div className="text-center">
                              <div className="position-relative">
                                <img src={props.foto} alt="Photo 2" className="profile-user-img img-fluid img-circle" />
                                <div className="ribbon-wrapper ribbon-lg">
                                  <div className="ribbon bg-success text-sm">
                                    {props.type_lead}
                                  </div>
                                </div>
                              </div>

                            {/* <img className="profile-user-img img-fluid img-circle" src={props.foto} alt={props.nombre} /> */}
                          </div>
                          <h3 className="profile-username text-center">{props.nombre}</h3>
                          <center>
                          <a className="text-muted text-center">I am: &nbsp;                         
                          <div className="btn-group">                                
                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  {props.type_lead}
                                </button> 
                                <div className="dropdown-menu">
                                  <button className="dropdown-item" type="button">Buyer</button>
                                  <button className="dropdown-item" type="button">Seller</button>
                                  <button className="dropdown-item" type="button">Lease</button>
                                  <button className="dropdown-item" type="button">Buyer/Seller</button>
                                </div>
                              </div>
                              </a>  
                              </center>
                              <br/>
                          <ul className="list-group list-group-unbordered mb-3">
                            <li className="list-group-item">
                              <b>Phone:</b> <a className="float-right">
                              <div className="btn-group">
                                {props.telefono}&nbsp;
                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-phone-alt"></i>
                                </button> 
                                <div className="dropdown-menu">
                                  <button className="dropdown-item" type="button">2 Way Phone</button>
                                  <button className="dropdown-item" type="button">Valid Number</button>
                                  <button className="dropdown-item" type="button">Unknown</button>
                                  <button className="dropdown-item" type="button">Do Not Call</button>
                                  <button className="dropdown-item" type="button">Opted-Out</button>
                                  <button className="dropdown-item" type="button">Wrong Number</button>
                                </div>
                              </div>
                              </a>

                            </li>
                            <li className="list-group-item">
                              <b>Mail:</b> <a className="float-right">
                              <div className="btn-group">
                              {props.correo}&nbsp;
                              <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fas fa-envelope"></i>
                              </button> 
                              <div className="dropdown-menu">
                                  <button className="dropdown-item" type="button">Valid Address</button>
                                  <button className="dropdown-item" type="button">Unknown</button>
                                  <button className="dropdown-item" type="button">2-Way Emailing</button>
                                  <button className="dropdown-item" type="button">Opted-Out</button>
                                  <button className="dropdown-item" type="button">Invalid Address</button>
                              </div>
                              </div></a>
                            </li>  
                            <li className="list-group-item">
                              <b>Direccion:</b> <a className="float-right">                              
                              <i className="fas fa-map-marked-alt"></i> 6919 South Jog Road, Peculiar, MO 64078
                              </a>
                            </li>
                          </ul>
                          {/* <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a> */}
                        </div>                 
                       </div>
                      {/* Acordion de datos */}
                      <div id="accordion">
                        {/* we are adding the .class so bootstrap.js collapse plugin detects it */}
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                EXECUTIVE SUMMARY
                              </a>
                            </h4>
                          </div>
                          <div id="collapseOne" className="panel-collapse collapse in">
                            <div className="card-body">
                              4/18/20- not looking; using the site for other purposes; Albert; 
                            </div>
                          </div>
                        </div>
                        <div className="card card-danger">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                CALL GOAL
                              </a>
                            </h4>
                          </div>
                          <div id="collapseTwo" className="panel-collapse collapse">
                            <div className="card-body">
                                Overdue
                                Call now!
                            </div>
                          </div>
                        </div>
                        <div className="card card-success">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                TASKS
                              </a>
                            </h4>
                          </div>
                          <div id="collapseThree" className="panel-collapse collapse">
                            <div className="card-body">
                              + ADD TASK
                            </div>
                          </div>
                        </div>
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                                APPOINTMENTS
                              </a>
                            </h4>
                          </div>
                          <div id="collapseFour" className="panel-collapse collapse">
                            <div className="card-body">
                              + ADD APPOINTMENTS
                            </div>
                          </div>
                        </div>
                        <div className="card card-success">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                                DETAILS
                              </a>
                            </h4>
                          </div>
                          <div id="collapseFive" className="panel-collapse collapse">
                            <div className="card-body">
                              <div className="card-body box-profile">    
                                <ul className="list-group list-group-unbordered mb-3">
                                  <li className="list-group-item">
                                    <b>Phone:</b> <a className="float-right">{props.telefono}</a>
                                  </li>
                                  <li className="list-group-item">
                                    <b>Mail:</b> <a className="float-right">{props.correo}</a>
                                  </li>                            
                                </ul>                               
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapsesix">
                                TAGS
                              </a>
                            </h4>
                          </div>
                          <div id="collapsesix" className="panel-collapse collapse">
                            <div className="card-body">
                              + ADD TAGS
                            </div>
                          </div>
                        </div>
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseseven">
                                OPPORTUNITIES
                              </a>
                            </h4>
                          </div>
                          <div id="collapseseven" className="panel-collapse collapse">
                            <div className="card-body">
                              + ADD OPPORTUNITIES
                            </div>
                          </div>
                        </div>
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapseeight">
                                FILES
                              </a>
                            </h4>
                          </div>
                          <div id="collapseeight" className="panel-collapse collapse">
                            <div className="card-body">
                              + ADD FILES
                            </div>
                          </div>
                        </div>
                        <div className="card card-primary">
                          <div className="card-header">
                            <h4 className="card-title">
                              <a data-toggle="collapse" data-parent="#accordion" href="#collapsenine">
                                CUSTOM FIELDS
                              </a>
                            </h4>
                          </div>
                          <div id="collapsenine" className="panel-collapse collapse">
                            <div className="card-body">
                              + CUSTOM FIELDS
                            </div>
                          </div>
                        </div>
                      </div>




                        {/* <div className="card" id="CardPesonal">
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
                        </div> */}
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
                          <PropertyProvider>
                            <ActivitiesContainer id_lead={props.id_lead} name={props.name} />
                          </PropertyProvider>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            </div>

  );
}
export default Card;
