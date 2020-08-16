import React from 'react';
import './styles/card.css';
import {NavLink} from 'react-router-dom';
import ActivityList from "./ActivityList";

import edit_icon from '../image/edit_icon.png';
import phone_icon from '../image/phone.png';
import mensaje_icon from '../image/mensaje.png';
import chat_icon from '../image/chat.png';
import net_icon from '../image/net.png';

import ContenidoCorrespondencia from '../paginas/LeadCommandCenter/ContenidoCorrespondencia';

const Card = (props) => {
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
                              <ContenidoCorrespondencia/>
                          </div>
                        </div>
                        <div className="card" id="ContenidoCasas">
                          <div className="card-body" id="CuerpoCasas">
                              <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group mr-2" role="group" aria-label="First group">
                                  <button type="button" className="btn btn-secondary">All Activities</button>
                                  <button type="button" className="btn btn-secondary">1 </button>
                                  <button type="button" className="btn btn-secondary">2</button>
                                  <button type="button" className="btn btn-secondary">3</button>
                                  <button type="button" className="btn btn-secondary">4</button>
                                </div>
                                <form className="d-none d-md-inline-block form-inline">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <button className="btn btn-primary mr-0 mr-md-3 my-2 my-md-0" type="button"><i className="fa fa-search"></i></button>
                                    </div>
                                 </form>
                            </div>
                            <div id="ContenidoEstadosCorrespondencia">
                              <h5 className="card-title">Aqui el contenido de las Casas</h5>
                                <ActivityList
                                    id_lead = {props.id_lead}
                                    lead_name = {props.nombre}
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            </div>

  );
}
export default Card;
