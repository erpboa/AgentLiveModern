import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoCalendar from './ContenidoCalendar';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const Calendar = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoCalendar/>
        </div>
        </div>

  );
}
export default Calendar;
