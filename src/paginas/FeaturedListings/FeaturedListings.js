import React, {useContext} from 'react';
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import ContenidoFeaturedListings from './ContenidoFeaturedListings';
import {CambiarEstados} from "../../contexts/CambiarEstados";

const FeaturedListings = () => {
  const {cambiarEstados} = useContext(CambiarEstados)

  return (

        <div className={cambiarEstados}>
        <MenuSuperior/>
        <div id="layoutSidenav">
          <MenuLateral/>
          <ContenidoFeaturedListings/>
        </div>
        </div>

  );
}
export default FeaturedListings;
