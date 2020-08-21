import React, {useContext,useEffect} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoLeadCommandCenter from './ContenidoLeadCommandCenter';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";
import MenuPrincipal from '../../components/MenuPrincipal';

const LeadCommandCenter = () => {

  const {userContext} = useContext(UserContext);

  if (userContext != null) {
    return (
          <div>
            <MenuPrincipal Titulo="Lead Command Center" Componente={<ContenidoLeadCommandCenter/>}/>
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
