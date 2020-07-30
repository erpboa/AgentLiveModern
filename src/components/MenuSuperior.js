import React, {useContext, useState} from 'react';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import MenuLateral from './MenuLateral';
import {CambiarEstados} from "../contexts/CambiarEstados";


const MenuSuperior = (props) => {
    const {cambiarEstados, setCambiarEstados} = useContext(CambiarEstados);

  //Creamos aqui un estado para cambiar
  const [esconder, setEsconder] = useState('sb-nav-fixed');
  //Aqui Llamamos a la funcion para esconder el menu MenuLateral
  const botonEsconder = e => {
    console.log("aqui recuperamos el estado",cambiarEstados);
     if (cambiarEstados == 'sb-nav-fixed') {
        setCambiarEstados('sb-sidenav-toggled');
     } else if (cambiarEstados == 'sb-sidenav-toggled') {
       setCambiarEstados('sb-nav-fixed');
     }
    // setCambiarEstados({estado:'sb-sidenav-toggled'})
  }

  return (
    <div>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="index.html">Live Moodern</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"  onClick={botonEsconder}><i className="fa fa-bars"></i></button>

        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
                <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button"><i className="fa fa-search"></i></button>
                </div>
            </div>
        </form>

        <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="dropdownMenuButton" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user fa-fw"></i></a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">Settings</a>
                    <a className="dropdown-item" href="#">Activity Log</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="login.html">Logout</a>
                </div>
            </li>
        </ul>
    </nav>
    </div>
  );
}
export default MenuSuperior;
