import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoReports from './ContenidoReports';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Reports = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoReports/>
        </div>
        </div>

  );
}
export default Reports;
