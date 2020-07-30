import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoDashboard from './ContenidoDashboard';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Dashboard = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoDashboard/>
        </div>
        </div>

  );
}
export default Dashboard;
