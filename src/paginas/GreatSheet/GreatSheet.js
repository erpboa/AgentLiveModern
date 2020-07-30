import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoGreatSheet from './ContenidoGreatSheet';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const GreatSheet = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoGreatSheet/>
        </div>
        </div>

  );
}
export default GreatSheet;
