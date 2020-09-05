import React, { useEffect,useContext,useState } from "react";

import { ServiceRest } from "../services/ServiceRest";
import { ReloadComponent } from "../contexts/ReloadComponent";
import $ from "jquery";

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



const Modal = (props) => {
  
  const [datos,setDatos] = useState(null); 
 
  const enviarDatos = (e) => {    
    setDatos(e.target.value);
 }

 const resetData = e => {
  document.getElementById("TextArea").value='';
 }
  
  const {reloadComponent, setReloadComponent } = useContext(ReloadComponent);

const saveDate = e => {       
    let params = { id_lead: props.id_lead, description:datos};        
    ServiceRest(props.action_register, params).then((resp) => {
      if (!resp.error) { 
        //$("#modalLlamadas").modal("hide");  
        window.$('#modalLlamadas').modal('hide');      
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
        document.getElementById("TextArea").value='';
                             
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




if (props.datos != undefined) {
  return (
  <div className="modal fade" id={props.datos.id_modal} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content" id="ColoresPaneles">
            <div className="modal-header">
              <h5 className="modal-title" id="Letras">{props.datos.titulo} <b style={{color:"blue"}}>{props.nombreLeadTabla}</b></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" id="Letras">&times;</span>
              </button>
            </div>
            <div className="modal-body">            
              {props.listado}
              <label id="Letras">Add Call Notes</label>
            <textarea className="form-control" id="TextArea" rows="3" onBlur = {enviarDatos}/>
           
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={resetData} data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveDate}>Save changes</button>
            </div>
        </div>
      </div>
    </div>
  )
} else {
  return (
  <div>
  </div>
  )
}
}
export default Modal;
