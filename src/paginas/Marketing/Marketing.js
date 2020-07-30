import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoMarketing from './ContenidoMarketing';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Marketing = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoMarketing/>
        </div>
        </div>

  );
}
export default Marketing;
