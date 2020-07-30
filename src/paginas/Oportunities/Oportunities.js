import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoOportunities from './ContenidoOportunities';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Oportunities = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoOportunities/>
        </div>
        </div>

  );
}
export default Oportunities;
