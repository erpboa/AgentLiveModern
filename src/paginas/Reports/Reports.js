import React, {useContext} from 'react';
import ContenidoReports from './ContenidoReports';
import MenuPrincipal from '../../components/MenuPrincipal';

const Reports = () => {

  return (

    <div>
      <MenuPrincipal Titulo="Reports" Componente={<ContenidoReports/>}/>
    </div>

  );
}
export default Reports;
