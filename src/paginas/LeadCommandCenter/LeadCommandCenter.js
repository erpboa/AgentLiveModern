import React, {useContext,useEffect,useState} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoLeadCommandCenter from './ContenidoLeadCommandCenter';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";
import MenuPrincipal from '../../components/MenuPrincipal';

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
const LeadCommandCenter = () => {

  const {userContext} = useContext(UserContext);
  const {cambiarEstados, setCambiarEstados} = useContext(CambiarEstados);
  const [mensaje, setMensaje] = useState(true);

  useEffect(() => {
    if (userContext != null) {
      if (cambiarEstados == true) {      
        const myNotice = alert({
                                text: "Welcome <b>"+userContext.user.nombre_usuario+"</b>",
                                type: 'success',
                                textTrusted: true,
                                closerHover: true,
                                modules: new Map([
                                  ...defaultModules,
                                ])
                              });
        //setCambiarEstados(false);
      }
    }

   }, [cambiarEstados]);


  if (userContext != null) {
    return (
          <div>
            <MenuPrincipal Componente={<ContenidoLeadCommandCenter/>}/>
          </div>
    )
  } else {
    return (
          <div>
          {<Redirect to="/" />}
          </div>
    )
  }

}
export default LeadCommandCenter;
