import React, {useContext} from 'react';
import ContenidoListings from './ContenidoListings';
import MenuPrincipal from '../../components/MenuPrincipal';
const Listings = (props) => {

  return (

        <div>
            <MenuPrincipal Titulo="Listings" Componente={<ContenidoListings/>}/>
        </div>

  );
}
export default Listings;
