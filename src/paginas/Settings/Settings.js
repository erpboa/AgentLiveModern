import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoSettings from './ContenidoSettings';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Settings = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoSettings/>
        </div>
        </div>

  );
}
export default Settings;
