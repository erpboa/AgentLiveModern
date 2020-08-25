import React, {useContext} from 'react';
import ContenidoCalendar from './ContenidoCalendar';
import MenuPrincipal from '../../components/MenuPrincipal';
const Calendar = (props) => {

  return (

        <div>
            <MenuPrincipal Titulo="Calendar" Componente={<ContenidoCalendar/>}/>
        </div>

  );
}
export default Calendar;
