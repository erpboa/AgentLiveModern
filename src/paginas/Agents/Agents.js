import React, {useContext} from 'react';
import ContenidoAgents from './ContenidoAgents';
import MenuPrincipal from '../../components/MenuPrincipal';


const Agents = () => {

  return (

    <div>
      <MenuPrincipal Titulo="" Componente={<ContenidoAgents/>}/>
    </div>

  );
}
export default Agents;
