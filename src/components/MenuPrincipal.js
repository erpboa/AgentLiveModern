import React, {useEffect,useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './styles/formLogin.css';
import {ReloadComponent} from "../contexts/ReloadComponent";
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Logo from '../image/logoPrincipal.png';
import User from '../image/userPrueba.jpg';
import {ServiceRest} from "../services/ServiceRest";
import $ from "jquery";
import PxpClient from 'pxp-client';
import {UserContext} from "../contexts/UserContext";
import {useHistory} from "react-router-dom";
import { Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Dropdown } from 'semantic-ui-react';

const MenuPrincipal = (props) => {

  /* Aqui recuperamos el usuario */
  const {userContext} = useContext(UserContext);

  const [usuarioInicio, setUsuarioInicio] = useState();
  let history = useHistory();
  /************************************************************/
  useEffect(() => {
    if (userContext != null) {
      const user = userContext.user.user;
      setUsuarioInicio(user);
    }
   }, []);



  /*Aqui Creamos el Hook para el Estado Inicial para el Combo*/
  const [listaCombo, setListaCombo] = useState('Select');
  /***********************************************************/

  /***************Insertar un nuevo Lead********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataLeadInsert, setLeadInsert] = useState();
    /*******************************************************/
    /*Creamos el contexto para actualizar la tabla*/
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    /**********************************************/

    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatos = (e) => {
        setLeadInsert({...dataLeadInsert,[e.target.name]: e.target.value,});
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertLead = async (e) => {
      if (reloadComponent == undefined || reloadComponent == false) {
        setReloadComponent(true);
      } else {
        setReloadComponent(false);
      }
      e.preventDefault();
      /*Llamamos al servicio ServiceRest para mandar la url y los parametros para hacer inserccion*/
      var insertar = ServiceRest('agent_portal/Lead/insertarLead',dataLeadInsert);
      insertar.then((resp) => {
        if (!resp.error) {
          /* $("#modalLead").modal("hide"); */
          window.$('#modalLead').modal('hide');
        } else {
          const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
          alert(msg);
        }
      })


    };
  /**************************************************************************************/
  /************************************************************/

 /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
 const llamarComboLead = e => {
  var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_types'};
  var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
   /*Formateamos el Promise de resultado para mandar el dato al combo*/
      listado.then((value) => {
              setListaCombo(value.datos.map((comboLead) =>
                          <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                            {comboLead.descripcion}
                          </option>
                      ));
      });
      document.getElementById("formularioLead").reset();
    }

    /****************************************************************/

    /****************Cerrar Sesion*****************/
    /*Funcion para Hacer Logout desde el Boton*/
        const cerrarSesion = e => {
          history.push("/");
          PxpClient.logout();
      }
    /******************************************/
    /********************************************/

    /* Actualizar la pagina */

 return (
      <div className="wrapper">
  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-white" id="ColoresPaneles">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i id="iconos" className="fas fa-bars" /></a>
      </li>
    </ul>
    {/* SEARCH FORM */}
    <form className="form-inline" id="FormBuscadorNavBar">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i id="iconos" className="fas fa-search" />
          </button>
        </div>
        <Button.Group>
            <button id="BotonesMenuDerechaSuperior" className="btn btn-primary" data-toggle="modal" data-target="#modalLead" type="button" onClick={llamarComboLead}><i className="fa fa-user" id="iconos"></i> Add Lead</button>
        </Button.Group>
    </div>
    </form>
    {/* Boton Opciones Usuario */}

    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <div className="BotonesMenuDerecha">

          <button id="BotonesMenuDerechaSuperior" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i id="iconos" className="fas fa-user"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-right" id="ColoresPaneles" >
            <button className="dropdown-item" id ="HoverMenu" type="button" onClick={cerrarSesion}><i id="iconos" className="fas fa-door-open"></i> Logout</button>
          </div>
        </div>


{/*


        <div className="btn-group">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i id="iconos" class="fas fa-user"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            <button className="dropdown-item" type="button"><i class="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div> */}
      </li>
    </ul>
  </nav>
  {/* /.navbar */}

  {/* Menu Lateral */}
  <aside className="main-sidebar elevation-4" id="ColoresPaneles">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link" id="Letras">
      <img src={Logo} alt="Live Modern" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">Live Modern</span>
    </a>

    {/* Sidebar */}
    <div className="sidebar" id="Letras">
    <div className="dropdown-divider"></div>
      {/* Datos del Usuario */}
      <div className="user-panel mt-1 pb-1 mb-1 d-flex">
        <div className="image">
          <img src={User} className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info" id="NombreUsuario">
              <p className="info">{usuarioInicio}</p>
        </div>
      </div>
      <div className="dropdown-divider"></div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview menu-open">
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a className="nav-link" href="/LeadCommandCenter" id="HoverMenu"><i id="iconos" className="fa fa-tachometer"></i> <p>Lead Command Center</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Calendar" id="HoverMenu"><i id="iconos" className="fa fa-calendar"></i> <p>Calendar</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Oportunities" id="HoverMenu"><i id="iconos" className="fa fa-handshake-o"></i> <p>Oportunities</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/GreatSheet" id="HoverMenu"><i id="iconos" className="fa fa-file-o"></i> <p>Great Sheet</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/FeaturedListings" id="HoverMenu"><i id="iconos" className="fa fa-handshake-o"></i> <p>Featured</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Import" id="HoverMenu"><i id="iconos" className="fa fa-file-o"></i> <p>Import</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Marketing" id="HoverMenu"><i id="iconos" className="fa fa-newspaper-o"></i> <p>Marketing</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Agents" id="HoverMenu"><i id="iconos" className="fa fa-users"></i> <p>Agents</p></a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/Listings" id="HoverMenu"><i id="iconos" className="fa fa-home"></i> <p>Listings</p></a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/Reports" id="HoverMenu"><i id="iconos" className="fa fa-line-chart"></i> <p>Reports</p></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Settings" id="HoverMenu"><i id="iconos" className="fa fa-cog"></i> <p>Settings</p></a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
      {/*<div className="container-fluid">  */}
        {props.Componente}
      {/*</div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <footer className="main-footer" id="ColoresPaneles">
    <strong id="Letras">Copyright © 2020 <b>LiveModer</b></strong> All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
    <img src={Logo} alt="Live Modern" className="brand-image img-circle elevation-3" width="30"/>
      <span className="brand-text font-weight-light" id="Letras"> Live Modern</span>
    </div>
  </footer>

         {/* Modal Formulario para agregar el Lad */}

         <div className="modal fade" id="modalLead" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" id="ColoresPaneles">
                    <div className="modal-header">
                        <h5 className="modal-title" id="Letras">Add New Lead</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" id="Letras">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="formularioLead" onSubmit={insertLead} className="was-validated" validate="true">
                            <div className="form-row">
                                <div className="col">
                                    <label id="Letras">First Name <strong className="text-danger" title="This is required">*</strong></label>
                                    <input type="text" className="form-control" id="formGroupExampleInput" name="first_name" onChange={enviarDatos} required/>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <div className="col">
                                    <label id="Letras">Last Name <strong className="text-danger" title="This is required">*</strong></label>
                                    <input type="text" className="form-control" id="formGroupExampleInput2" name="last_name" onChange={enviarDatos} required/>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                <label id="Letras">Code Country <strong className="text-danger" title="This is required">*</strong></label>
                                <input type="number" className="form-control" id="formGroupExampleInput2" name="code_country" onChange={enviarDatos} required/>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="col">
                                <label id="Letras">Phone Number <strong className="text-danger" title="This is required">*</strong></label>
                                <input type="number" className="form-control" id="formGroupExampleInput2" name="phone" onChange={enviarDatos} required/>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            </div>
                            <label id="Letras">Email Address <strong className="text-danger" title="This is required">*</strong></label>
                            <input type="email" className="form-control" id="formGroupExampleInput2" name="email" onChange={enviarDatos} required/>
                            <div className="invalid-feedback">Please fill out this field.</div>
                            <label id="Letras">State <strong className="text-danger" title="This is required">*</strong></label>
                            <select id="inputState" className="form-control" name="type_lead" onChange={enviarDatos}>
                                <option hidden defaultValue>Select type lead</option>
                                {listaCombo}
                            </select>
                              <div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="button" type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
         </div>



</div>

    );
}
export default MenuPrincipal;
