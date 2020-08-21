import React, {useContext} from 'react';
import ContenidoGreatSheet from './ContenidoGreatSheet';
import MenuPrincipal from '../../components/MenuPrincipal';
const GreatSheet = () => {

  return (
    <div>
      <MenuPrincipal Titulo="Great Sheet" Componente={<ContenidoGreatSheet/>}/>
    </div>
  );
}
export default GreatSheet;
