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

            <div className="container-fluid" id="ContenidoLeadInfo">
            <div className="row">
                <div className="col-sm-4" id="ContenidoInfo">
                  <div className="row" id="contenido">
                      <div className="col-sm-12">
                        <div className="card" id="ContenidoInfoLead">
                          <h1>
                            <img id="ImagenAvatar" src={props.foto} className="card-img-top img-fluid rounded" alt="Avatar"/><b id="TituloCard">{props.nombre}</b>
                          </h1>
                          <div className="card-body">
                            <NavLink className="nav-link" to="#">{props.telefono}</NavLink>
                            <NavLink className="nav-link" to="#">{props.correo}</NavLink>
                            <NavLink className="nav-link" to="#">{props.type_lead}</NavLink>
                          </div>
                          <form>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">EXECUTIVE SUMMARY</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                        </form>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-sm-8" id="ContenidoCorrespondenciaGeneral">
                  <div className="row">
                      <div class="col-sm-12">
                        <div class="card" id="ContenidoCorrespondencia">
                          <div class="card-body" id="CuerpoCorrespondecia">
                              <ContenidoCorrespondencia/>                               
                          </div>
                        </div>
                        <div class="card" id="ContenidoCasas">
                          <div class="card-body" id="CuerpoCasas">
                              <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                <div class="btn-group mr-2" role="group" aria-label="First group">
                                  <button type="button" class="btn btn-secondary">All Activities</button>
                                  <button type="button" class="btn btn-secondary">1 </button>
                                  <button type="button" class="btn btn-secondary">2</button>
                                  <button type="button" class="btn btn-secondary">3</button>
                                  <button type="button" class="btn btn-secondary">4</button>
                                </div>
                                <form className="d-none d-md-inline-block form-inline">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <button className="btn btn-primary mr-0 mr-md-3 my-2 my-md-0" type="button"><i className="fa fa-search"></i></button>
                                    </div>
                                 </form>
                            </div>
                            <div id="ContenidoEstadosCorrespondencia">
                              <h5 class="card-title">Aqui el contenido de las Casas</h5>
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
