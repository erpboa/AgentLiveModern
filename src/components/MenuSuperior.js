import React, {useEffect, useContext, useState} from 'react';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import MenuLateral from './MenuLateral';
import PxpClient from 'pxp-client';
import {CambiarEstados} from "../contexts/CambiarEstados";

const MenuSuperior = (props) => {
  /**********************Menu Superior Lateral********************/
    /*Aqui Usamos el estado para ocultar y mostrar el menu*/
    const [esconder, setEsconder] = useState(true);
    const {cambiarEstados, setCambiarEstados} = useContext(CambiarEstados);
    /*Aqui Llamamos a la funcion para esconder el menu MenuLateral*/
    const botonEsconder = e => {
       if (esconder == true) {
         setCambiarEstados('sb-sidenav-toggled');
         setEsconder(false);
       } else if (esconder == false) {
         setCambiarEstados('sb-nav-fixed');
         setEsconder(true);
       }
    }
    /*********************************************************/
  /***************************************************************/


  /***********************Lista del Combo Tipo Lead Para Agregar Leads******************/
  /*Aqui Creamos el Hook para el Estado Inicial para el Combo*/
    const [listaCombo, setListaCombo] = useState('Select');
  /***********************************************************/
  /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
    const llamarComboLead = e => {
    var listado =  PxpClient.doRequest({
                            url: 'parametros/Catalogo/listarCatalogoCombo',
                            params: {
                                      start: 0,
                                      limit: 1000,
                                      codSubsistema:'AP',
                                      catalogo_tipo:'tlead_types'
                                    }
                          });
     /*Formateamos el Promise de resultado para mandar el dato al combo*/
          listado.then((value) => {
                  setListaCombo(value.datos.map((comboLead) =>
                              <option key={comboLead.descripcion}>{comboLead.descripcion}</option>
                          ));
          });
        }
      /****************************************************************/
  /***********************************************************/
  /*****************************************************************************************/


  /****************Cerrar Sesion*****************/
    /*Funcion para Hacer Logout desde el Boton*/
      const cerrarSesion = e => {
          PxpClient.logout();
      }
    /******************************************/
  /********************************************/

  return (
    <div>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="index.html">Live Moodern</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"  onClick={botonEsconder}><i className="fa fa-bars"></i></button>
        <div id="menusuperior">
        <form className="d-none d-md-inline-block form-inline">
          <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <button className="btn btn-primary mr-0 mr-md-3 my-2 my-md-0" type="button"><i className="fa fa-search"></i></button>
          </div>
        </form>
        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id="botonMenu" type="button" onClick={llamarComboLead}><i className="fa fa-user" id="iconBoton"></i> Add Lead</button>

        <ul className="navbar-nav ml-auto ml-md-0" id="submenuUser">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="dropdownMenuButton" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user fa-fw"></i></a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">Settings</a>
                    <a className="dropdown-item" href="#">Activity Log</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={cerrarSesion}>Logout</a>
                </div>
            </li>
        </ul>
        </div>
    </nav>

    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add New Lead</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form>
          <div className="form-row">
             <div className="col">
               <label>First Name</label>
               <input type="text" className="form-control" id="formGroupExampleInput"/>
             </div>
             <div className="col">
               <label>Last Name</label>
               <input type="text" className="form-control" id="formGroupExampleInput2"/>
             </div>
          </div>
          <div className="form-row">
             <div className="col">
               <label>Phone Number</label>
               <input type="text" className="form-control" id="formGroupExampleInput2"/>
             </div>
             <div className="col">
               <label>Email Address</label>
               <input type="email" className="form-control" id="formGroupExampleInput2"/>
             </div>
          </div>
          <label>State</label>
            <select id="inputState" className="form-control">
              {listaCombo}
            </select>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}
export default MenuSuperior;
