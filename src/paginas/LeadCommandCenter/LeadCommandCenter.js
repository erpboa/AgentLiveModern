import React, {useContext,useEffect,useState} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoLeadCommandCenter from './ContenidoLeadCommandCenter';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";
import MenuPrincipal from '../../components/MenuPrincipal';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error} from '@pnotify/core';

const LeadCommandCenter = () => {

  const {userContext} = useContext(UserContext);
  const {cambiarEstados, setCambiarEstados} = useContext(CambiarEstados);   
  const [mensaje, setMensaje] = useState(true);

  useEffect(() => {  
    if (userContext != null) {              
      if (cambiarEstados == true) {
        success({
          text: 'Welcome '+userContext.user.nombre_usuario,               
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
