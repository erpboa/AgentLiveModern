import React, {useEffect,useContext,useState} from 'react';
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
import {ServiceRest} from "../services/ServiceRest";
import {ReloadComponent} from "../contexts/ReloadComponent";

/*importamos las librerias de PNotify*/
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import * as PNotifyDesktop from '@pnotify/desktop';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
import * as PNotifyAnimate from '@pnotify/animate';
defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/
const Card = props => {

  /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
  const [datosRecibidos, setDatosRecibidos] = useState(props.type_lead);
  const [listaCombo, setListaCombo] = useState();
  const [cambiarValor, setCambiarValor] = useState(false);

  const llamarComboLead = e => {
   var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_types'};
   var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
    /*Formateamos el Promise de resultado para mandar el dato al combo*/
       listado.then((value) => {
               setListaCombo(value.datos.map((comboLead) =>
                           <button
                                  key={comboLead.descripcion}
                                  id={comboLead.descripcion}
                                  className="dropdown-item"
                                  type="button"
                                  value={comboLead.descripcion}
                                  onClick={updateLead}>{comboLead.descripcion}
                          </button>
                       ));
       });
     }
     /****************************************************************/
     /*Aqui llamamos al Action para Actualizar el Lead*/
     const updateLead = async (e) => {
       let params = { id_lead: props.id_lead, type_lead:e.target.value, edit_type:'typeLead'};
       var value = e.target.value;
       ServiceRest("agent_portal/Lead/modificarLeadCondicional", params).then((resp) => {
         if (!resp.error) {
              setDatosRecibidos(value);
              setCambiarValor(true);
              const myNotice = alert({
                                      text: "Successful Update for: <b>"+props.nombre+"</b>",
                                      type: 'success',
                                      textTrusted: true,
                                      closerHover: true,
                                      modules: new Map([
                                        ...defaultModules,
                                      ])
                                    });

         } else {
           const myNotice = alert({
                                   text: "Report the code: <b>"+resp.data.id_log+"</b> for your review. <br>Detail: <b>"+resp.detail.message+"</b>",
                                   type: 'error',
                                   textTrusted: true,
                                   closerHover: true,
                                   modules: new Map([
                                     ...defaultModules,
                                   ])
                                 });
         }
       })
     }
     /*************************************************/
     useEffect(() => {
       if (cambiarValor == false) {
         setDatosRecibidos(props.type_lead);
       }
       llamarComboLead();
     }, [props,cambiarValor]);


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
                                    {datosRecibidos}
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
                                  {datosRecibidos}
                                </button>
                                <div className="dropdown-menu">
                                  {listaCombo}
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
                            <ActivitiesContainer id_lead={props.id_lead} name={props.nombre} />
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
