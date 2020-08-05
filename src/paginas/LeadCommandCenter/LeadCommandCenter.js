import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoLeadCommandCenter from './ContenidoLeadCommandCenter';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";

const LeadCommandCenter = () => {
  const {cambiarEstados} = useContext(CambiarEstados);
  const {userContext} = useContext(UserContext);

  if (userContext != null) {
    return (
          <div className={cambiarEstados}>
          {userContext === null && <Redirect to="/" />}
          <MenuSuperior/>
          <div id="layoutSidenav">
            <MenuLateral/>
            <ContenidoLeadCommandCenter/>
          </div>
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
