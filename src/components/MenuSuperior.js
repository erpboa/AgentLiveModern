import React, {useContext, useState} from 'react';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import PxpClient from 'pxp-client';
import {CambiarEstados} from "../contexts/CambiarEstados";
import {ReloadComponent} from "../contexts/ReloadComponent";
import {ServiceRest} from "../services/ServiceRest";
import $ from "jquery";

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
  /***********************************************************/
  /*****************************************************************************************/

  /****************Cerrar Sesion*****************/
    /*Funcion para Hacer Logout desde el Boton*/
      const cerrarSesion = e => {
          PxpClient.logout();
      }
    /******************************************/
  /********************************************/

  /***************Insertar un nuevo Lead********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataLeadInsert, setLeadInsert] = useState();
    const [paramLeadInsert, setParamLeadInsert] = useState();
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
          $("#modalLead").modal("hide");
        } else {
          const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
          alert(msg);
        }
      })


    };
  /**************************************************************************************/
  /************************************************************/


  return (
    <div>
    <nav className="sb-topnav navbar navbar-expand" id="ColoresPaneles">
        <a className="navbar-brand" href="index.html" id="Letras">Live Moodern</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"  onClick={botonEsconder}><i id="iconos" className="fa fa-bars"></i></button>
        <div id="menusuperior">
        <form className="d-none d-md-inline-block form-inline">
          <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <button className="btn btn-primary mr-0 mr-md-3 my-2 my-md-0" type="button"><i id="iconos" className="fa fa-search"></i></button>
          </div>
        </form>
        <button className="btn btn-primary" data-toggle="modal" data-target="#modalLead" id="botonMenu" type="button" onClick={llamarComboLead}><i className="fa fa-user" id="iconos"></i> Add Lead</button>

        <ul className="navbar-nav ml-auto ml-md-0" id="submenuUser">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="dropdownMenuButton" id="iconos" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i id="iconos" className="fa fa-user fa-fw"></i></a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown" id="ColoresPaneles" >
                    <a className="dropdown-item" href="#" id="HoverMenu">Settings</a>
                    <a className="dropdown-item" href="#" id="HoverMenu">Activity Log</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" id="Letras" href="#" id="HoverMenu" onClick={cerrarSesion}>Logout</a>
                </div>
            </li>
        </ul>
        </div>
    </nav>

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
          <form id="formularioLead" className="was-validated" noValidate>
          <div className="form-row">
             <div className="col">
               <label id="Letras">First Name <strong className="text-danger" title="This is required">*</strong></label>
               <input type="text" className="form-control" id="formGroupExampleInput" name="first_name" onChange={enviarDatos} required/>
             </div>
             <div className="col">
               <label id="Letras">Last Name <strong className="text-danger" title="This is required">*</strong></label>
               <input type="text" className="form-control" id="formGroupExampleInput2" name="last_name" onChange={enviarDatos} required/>
             </div>
          </div>
          <div className="form-row">
             <div className="col">
               <label id="Letras">Phone Number <strong className="text-danger" title="This is required">*</strong></label>
               <input type="text" className="form-control" id="formGroupExampleInput2" name="phone" onChange={enviarDatos} required/>
             </div>
             <div className="col">
               <label id="Letras">Email Address <strong className="text-danger" title="This is required">*</strong></label>
               <input type="email" className="form-control" id="formGroupExampleInput2" name="email" onChange={enviarDatos} required/>
             </div>
          </div>
          <label id="Letras">State <strong className="text-danger" title="This is required">*</strong></label>
            <select id="inputState" className="form-control" name="type_lead" onChange={enviarDatos}>
            <option hidden defaultValue>Select type lead</option>
            {listaCombo}
            </select>
          </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onClick={insertLead} className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}
export default MenuSuperior;
