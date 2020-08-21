import React, {useContext} from 'react';
import ContenidoOportunities from './ContenidoOportunities';
import MenuPrincipal from '../../components/MenuPrincipal';

const Oportunities = () => {

  return (

    <div>
    <MenuPrincipal Titulo="Oportunities" Componente={<ContenidoOportunities/>}/>
    </div>

  );
}
export default Oportunities;
