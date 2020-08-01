import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoDashboard from './ContenidoDashboard';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";

const Dashboard = () => {
  const {cambiarEstados} = useContext(CambiarEstados);
  const {userContext} = useContext(UserContext);

  if (userContext != null) {
    return (
          <div className={cambiarEstados}>
          {userContext === null && <Redirect to="/" />}
          <MenuSuperior/>
          <div id="layoutSidenav">
            <MenuLateral/>
            <ContenidoDashboard/>
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
export default Dashboard;
