import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoAgents from './ContenidoAgents';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Agents = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoAgents/>
        </div>
        </div>

  );
}
export default Agents;
