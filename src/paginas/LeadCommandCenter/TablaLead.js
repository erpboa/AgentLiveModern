import React, {useEffect,useState,useContext} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {NavLink} from 'react-router-dom';
import Modal from '../../components/Modal';


import moment from 'moment';
import Currency  from '../../utilities/Currency';
import TableFixed  from '../../utilities/TableFixed';
import {ServiceRest} from "../../services/ServiceRest";
import { ComboList } from '../../components/ComboList';
import FormCallPrincipal from './FormCallPrincipal';
import { ReloadComponent } from "../../contexts/ReloadComponent";

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
  
  let action_register_log = 'agent_portal/Call/insertarCallPrincipal'; 
  const {reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  
  const [listaCombo, setListaCombo] = useState();//Hooks para listar el combo Stage
  const [listaComboStage, setListaComboStage] = useState();//Hooks para listar el combo Stage  
  const [datosRecibidos, setDatosRecibidos] = useState();//Hooks para recibir el id_lead  
  
  /*Aqui Ponemos el Header de la tabla Fija*/
  const scrollHandle = e => {
    e.target.querySelector('thead').style.transform = 'translateY(' + e.target.scrollTop + 'px)';
  }
  useEffect(() => {
       TableFixed.obtenerTabla('#table-cont').addEventListener('scroll',scrollHandle);       
       if (listaCombo==undefined) {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tcall_logs'};   
        var listado_combo = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params); 
        listado_combo.then((value) => {
          if (!value.error) { 
                setListaCombo(value.datos.map((comboLead) =>
                              <div className="col-6 col-sm-6 col-md-4 d-flex align-items-stretch" key={comboLead.descripcion}>
                                <div className="card"> 
                                    <a href="#" value = {comboLead.descripcion} className="btn btn-secondary active" id={comboLead.codigo} style={{width: 120}} role="button" aria-pressed="true" >{comboLead.descripcion}</a>                                                                         
                                </div>                             
                              </div>  
                        ));
            }
          });
       }      
       
  }, [listaCombo]); 
  /******************************************/

  /*Creamos la variable que almacenara los Campos del Lead*/
  const [nombreLead, setNombreLead] = useState();
  /*******************************************************/
     

    const updateCall = (e) => {            
      let params = { id_lead: e.target.id, stage_lead:e.target.value, edit_type:'stageLead'};
      var value = e.target.value; 
      ServiceRest("agent_portal/Lead/modificarLeadCondicional", params).then((resp) => {
        if (!resp.error) {
          setReloadComponent(true);
             const myNotice = alert({
                                     text: "Successful Update",
                                     type: 'success',
                                     textTrusted: true,
                                     closerHover: true,
                                     modules: new Map([
                                       ...defaultModules,
                                     ])
                                   });
          setReloadComponent(false);
  
  
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

  /*Aqui llamamos el id Modal para tener un modal dianmico*/

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
  const [datosModalCalled,setDatosModalCalled] = useState({id_modal:idModalCalled,titulo:"Called logged:"});
  const [datosModalEmails,setDatosModalEmails] = useState({id_modal:idModalEmails,titulo:"Emails",contenido:formularioMails});
  /********************************************************/
  const [modalComponente,setmodalComponente] = useState();

  const sentModal = (id_lead,nombre_lead) => {    
    setEnvioId(id_lead);   
    setDatosRecibidos({listaCombo}); 
    setNombreLead(nombre_lead);    
  }

   useEffect(() => {
        setmodalComponente(<Modal action_register={action_register_log} id_modal={idModalCalled} datos={datosModalCalled} id_lead={envioId} nombreLeadTabla={nombreLead} listado={<FormCallPrincipal lista={datosRecibidos}/>}/>);
  }, [envioId]); 

  const [currentPage,setCurrentPage] = useState(1);

  const changeCurrentPage = numPage => {
    console.log("aqui llega data",numPage);
    setCurrentPage(numPage);
    //fetch a data
    //or update a query to get data
  };

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
              {/* <a className="btn btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" value={post.id_lead} onClick={(value) => setMandar(post.id_lead)}>
                {post.stage}
              </a> */}
              
                <a className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {post.stage}
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" href="#" value="NEW" onClick={updateCall} id={post.id_lead}>NEW</button>
                    <button className="dropdown-item" href="#" value="SHOWING" onClick={updateCall} id={post.id_lead}>SHOWING</button>
                    <button className="dropdown-item" href="#" value="CLOSED" onClick={updateCall} id={post.id_lead}>CLOSED</button>
                    <button className="dropdown-item" href="#" value="HOT" onClick={updateCall} id={post.id_lead}>HOT</button>
                    <button className="dropdown-item" href="#" value="NURTURING" onClick={updateCall} id={post.id_lead}>NURTURING</button>
                    <button className="dropdown-item" href="#" value="PAST CLIENT" onClick={updateCall} id={post.id_lead}>PAST CLIENT</button>
                    <button className="dropdown-item" href="#" value="PENDING" onClick={updateCall} id={post.id_lead}>PENDING</button>
                    <button className="dropdown-item" href="#" value="SPHERE" onClick={updateCall} id={post.id_lead}>SPHERE</button>
                    <button className="dropdown-item" href="#" value="COLD" onClick={updateCall} id={post.id_lead}>COLD</button>
                    <button className="dropdown-item" href="#" value="ARCHIVED" onClick={updateCall} id={post.id_lead}>ARCHIVED</button>
                    <button className="dropdown-item" href="#" value="TRASHED" onClick={updateCall} id={post.id_lead}>TRASHED</button>
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
                <button type="button" id="BotonContenedor" className="btn btn-success" data-toggle="modal" data-target="#modalLlamadas" name="modalLlamadas" onClick={(value) => sentModal(post.id_lead,post.full_name)}><i aria-hidden="true" className="fa fa-phone" id="ContenidoIcono" ></i>{post.llamadas}</button>
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
