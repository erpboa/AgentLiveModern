import React, {useContext} from 'react';
import ContenidoFeaturedListings from './ContenidoFeaturedListings';
import MenuPrincipal from '../../components/MenuPrincipal';
const FeaturedListings = () => {
  
  return (
    <div>
      <MenuPrincipal Titulo="Calendar" Componente={<ContenidoFeaturedListings/>}/>
    </div>

  );
}
export default FeaturedListings;
