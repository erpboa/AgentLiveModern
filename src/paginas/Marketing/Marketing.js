import React, {useContext} from 'react';
import ContenidoMarketing from './ContenidoMarketing';
import MenuPrincipal from '../../components/MenuPrincipal';

const Marketing = () => {

  return (

    <div>
      <MenuPrincipal Titulo="Marketing" Componente={<ContenidoMarketing/>}/>
    </div>


  );
}
export default Marketing;
