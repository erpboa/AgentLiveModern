import React, {useContext} from 'react';
import ContenidoSettings from './ContenidoSettings';
import MenuPrincipal from '../../components/MenuPrincipal';

const Settings = () => {

  return (

    <div>
      <MenuPrincipal Titulo="" Componente={<ContenidoSettings/>}/>
    </div>

  );
}
export default Settings;
