import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoImport from './ContenidoImport';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Import = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoImport/>
        </div>
        </div>

  );
}
export default Import;
