import React, {useContext} from 'react';
import ContenidoImport from './ContenidoImport';
import MenuPrincipal from '../../components/MenuPrincipal';

const Import = () => {

  return (

    <div>
      <MenuPrincipal Titulo="Import" Componente={<ContenidoImport/>}/>
    </div>

  );
}
export default Import;
