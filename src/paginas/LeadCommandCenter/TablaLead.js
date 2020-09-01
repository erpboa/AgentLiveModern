import React, {useEffect,useState} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {NavLink} from 'react-router-dom';
import Modal from '../../components/Modal';

import moment from 'moment';
import Currency  from '../../utilities/Currency';
import TableFixed  from '../../utilities/TableFixed';
import {ServiceRest} from "../../services/ServiceRest";
import { ComboList } from '../../components/ComboList';

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

const TablaLead = ({ posts, loading, paginacion }) => {
  let action_rest = 'parametros/Catalogo/listarCatalogoCombo';
  var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_type_stage'};
  const [estadoCheck, setEstadoCheck] = useState(false);
  const [idLead,setIdLead] = useState(null);//Hooks para obtener el id Lead
  const [listaCombo, setListaCombo] = useState();//Hooks para listar el combo Stage
  const [datosRecibidos, setDatosRecibidos] = useState(posts.type_lead);//Hooks para recibir el id_lead
  const [cambiarValor, setCambiarValor] = useState(false);//Hooks para Renderizar la tabla con el nuevo valor
  /*Aqui Ponemos el Header de la tabla Fija*/
  const scrollHandle = e => {
    e.target.querySelector('thead').style.transform = 'translateY(' + e.target.scrollTop + 'px)';
  }


  useEffect(() => {
       TableFixed.obtenerTabla('#table-cont').addEventListener('scroll',scrollHandle);
  }, [posts,cambiarValor]);
  /******************************************/

  /*Creamos la variable que almacenara los Campos del Lead*/
  const [dataLogCall, setLogCall] = useState();
  /*******************************************************/

  const enviarDatos = (e) => {
      setLogCall({...dataLogCall,[e.target.name]: e.target.value,});
  };

  /*Aqui llamamos el id Modal para tener un modal dianmico*/
  var formularioCalled = <form id="formularioLead">
                            <div className="card card-solid">
                              <div className="card-body pb-0">
                                <div className="row d-flex align-items-stretch"> 
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card"> 
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card">  
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card"> 
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card"> 
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card"> 
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                      <div className="card"> 
                                          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>                                                                         
                                      </div>
                                    </div>
                                </div>
                              </div>
                            </div>

                           


                            {/* <div className="form-group">
                              <label id="Letras">Add Call Notes</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onBlur = {enviarDatos}/>
                            </div> */}
                          </form>;




  var formularioMails = <form id="formularioLead">
                            <div className="form-group row">
                              <label id="Letras" className="col-sm-2 col-form-label">For</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" id="formGroupExampleInput" defaultValue="email@example.com"/>
                              </div>
                            </div>
                            <div className="form-group">
                              <label id="Letras">Mail</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                          </form>;

  const [idModalCalled,setIdModalCalled] = useState("modalLlamadas");
  const [envioId,setEnvioId] = useState();
  const [idModalEmails,setIdModalEmails] = useState("modalEmails");
  const [datosModalCalled,setDatosModalCalled] = useState({id_modal:idModalCalled,titulo:"Called",contenido:formularioCalled});
  const [datosModalEmails,setDatosModalEmails] = useState({id_modal:idModalEmails,titulo:"Emails",contenido:formularioMails});
  /********************************************************/
  const [modalComponente,setmodalComponente] = useState();

  const sentModal = (id_lead) => {
    setEnvioId(id_lead);
  }

  useEffect(() => {
    setmodalComponente(<Modal id_modal={idModalCalled} datos={datosModalCalled} id_lead={envioId}/>);
  }, [envioId]);

return (

  <div className='table-cont' id='table-cont'>
    <Table className="table">
        <Thead className="thead-dark">
          <Tr>
            <Th scope="col">
              <input type="checkbox" />
              <label> </label>
            </Th>
            <Th className="AnchoCabTabla" id="Letras">Stage</Th>
            <Th className="AnchoCabTabla" id="Letras">Type</Th>
            <Th className="AnchoCabTabla" id="Letras">Name</Th>
            <Th className="AnchoCabTabla" id="Letras">Phone</Th>
            <Th className="AnchoCabTabla" id="Letras">CallGoal</Th>
            <Th className="AnchoCabTabla" id="Letras">Tasks</Th>
            <Th className="AnchoCabTabla" id="Letras">Calls</Th>
            <Th className="AnchoCabTabla" id="Letras">Emails</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-bolt" aria-hidden="true">A</i></Th>
            <Th className="AnchoCabTabla" id="Letras">LastVisit</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-eye" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-home" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-heart" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras">Price</Th>
            <Th className="AnchoCabTabla" id="Letras">Registered</Th>
            <Th className="AnchoCabTabla" id="Letras">Agent Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Lead Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Close Date</Th>
            <Th className="AnchoCabTabla" id="Letras">Birthday</Th>
            <Th className="AnchoCabTabla" id="Letras">Address</Th>
            <Th className="AnchoCabTabla" id="Letras">Tags</Th>
          </Tr>
        </Thead>
        <Tbody id="TablaContenedor">
        {posts.map(post => (
          <Tr key = {post.id_lead}>
              <Td>
              <input type="checkbox" name="vehicle1" defaultValue="Bike" />
              <label htmlFor="vehicle1"> </label>
              </Td>
              <Td>
              <a className="btn btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={post.id_lead}>
                {post.stage}
              </a>
              <div className="dropdown-menu">
                <ComboList  id_lead={post.id_lead}  action={action_rest}  params = {params} />
              </div>
              </Td>
              <Td>
                {post.type_lead}
              </Td>
              <Td>
                <a data-toggle="tooltip" data-placement="top" title={`${post.full_name}`} className="nav-link" href={`CommandInfo/Lead${post.id_lead}`}>{post.full_name}</a>
              </Td>
              <Td>
                {post.phone}
              </Td>
              <Td>
                call goal
              </Td>
              <Td>
                <NavLink data-toggle="tooltip" data-placement="top" className="nav-link" to="#"><div>+ add {post.descripcion_tarea}</div></NavLink>
              </Td>
              <Td>
                <button type="button" id="BotonContenedor" className="btn btn-success" data-toggle="modal" data-target="#modalLlamadas" name="modalLlamadas" onClick={(value) => sentModal(post.id_lead)}><i aria-hidden="true" className="fa fa-phone" id="ContenidoIcono" ></i>{post.llamadas}</button>
              </Td>
              <Td>
              <button type="button" id="BotonContenedor" className="btn btn-warning" data-toggle="modal" data-target="#modalEmails" name="modalEmails" onClick={(value) => setDatosModalEmails(datosModalEmails)}><i aria-hidden="true" className="fa fa-share" id="ContenidoIcono" ></i>{post.emails}</button>
              </Td>
              <Td>
                <i className="fa fa-bolt" aria-hidden="true">{post.action_plan}</i>
              </Td>
              <Td>
                 {moment.unix(post.ultima_visita).fromNow()} <br/>
                 <span>last visit</span>
              </Td>
              <Td>
              <i className="fa fa-eye" aria-hidden="true"></i> {post.vistas}
              </Td>
              <Td>
              <i className="fa fa-home" aria-hidden="true"></i> {post.casas}
              </Td>
              <Td>
              <i className="fa fa-heart" aria-hidden="true"></i> {post.likes}
              </Td>
              <Td>
                <span className="bold green-text">$ {Currency.currencyFormat(post.price)}</span>
              </Td>
              <Td>
                {post.fecha_reg}
              </Td>
              <Td>
                {post.activity_agent}<br/>
                <b id="nombreAgent">{post.agent_name}</b>
              </Td>
              <Td>
                {moment.unix(post.lead_activity).fromNow()}
              </Td>
              <Td>
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                {post.address}
              </Td>
              <Td>
                {post.tags}
              </Td>
            </Tr>
        ))}
        </Tbody>
      </Table>
      {modalComponente}
      {paginacion}
      </div>


  );

}
export default TablaLead;
