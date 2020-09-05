import React, { useEffect,useContext,useState } from "react";
import { ServiceRest } from "../services/ServiceRest";
import { ReloadComponent } from "../contexts/ReloadComponent";

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

export const ComboList = (props) => {

  /*Aqui llamamos al Action para Actualizar el Lead*/
  const [listaCombo, setListaCombo] = useState();//Hooks para listar el combo Stage
  const [carga, setCarga] = useState();//Hooks para listar el combo Stage
  const {reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const updateLead = async (e) => {
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
  /*************************************************/
  const llamarComboStage = () => {
    
     }

     useEffect(() => {
          if (listaCombo == undefined) {
            var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_type_stage'};
            var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
            /*Formateamos el Promise de resultado para mandar el dato al combo*/
              listado.then((value) => {
                setListaCombo(value.datos.map((comboLead) =>
                          <button
                                  key={comboLead.descripcion}
                                  id={props.id_lead}
                                  className="dropdown-item"
                                  type="button"
                                  value={comboLead.descripcion}
                                  onClick={updateLead}
                                >{comboLead.descripcion}
                          </button>
                        ));
              });
          }            
     }, [listaCombo]);

  return (
    <div>
        {listaCombo}
    </div>
  );
};
