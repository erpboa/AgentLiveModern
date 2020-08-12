import React from 'react';
import {NavLink} from 'react-router-dom';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';

const MenuLateral = () => {
  return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu" id="ColoresPaneles">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading" id="ColoresPanelesFooter">Menu</div>
                        <NavLink className="nav-link" to="/LeadCommandCenter" id="HoverMenu"><div><i id="iconos" className="fa fa-tachometer"></i> Lead Command Center</div></NavLink>
                        <NavLink className="nav-link" to="/Calendar" id="HoverMenu"><div><i id="iconos" className="fa fa-calendar"></i> Calendar</div></NavLink>
                        <NavLink className="nav-link" to="/Oportunities" id="HoverMenu"><div><i id="iconos" className="fa fa-handshake-o"></i> Oportunities</div></NavLink>
                        <NavLink className="nav-link" to="/GreatSheet" id="HoverMenu"><div><i id="iconos" className="fa fa-file-o"></i> Great Sheet</div></NavLink>
                        <NavLink className="nav-link" to="/FeaturedListings" id="HoverMenu"><div><i id="iconos" className="fa fa-newspaper-o"></i> Featured Listings</div></NavLink>
                        <NavLink className="nav-link" to="/Import" id="HoverMenu"><div><i id="iconos" className="fa fa-exchange"></i> Import</div></NavLink>
                        <NavLink className="nav-link" to="/Marketing" id="HoverMenu"><div><i  id="iconos" className="fa fa-bullhorn"></i> Marketing</div></NavLink>
                        <NavLink className="nav-link" to="/Agents" id="HoverMenu"><div><i id="iconos" className="fa fa-users"></i> Agents</div></NavLink>
                        <NavLink className="nav-link" to="/Reports" id="HoverMenu"><div><i id="iconos" className="fa fa-line-chart"></i> Reports</div></NavLink>
                        <NavLink className="nav-link" to="/Settings" id="HoverMenu"><div><i id="iconos" className="fa fa-cog"></i> Settings</div></NavLink>
                    </div>
                </div>
                <div className="sb-sidenav-footer" id="ColoresPanelesFooter">
                    <div className="small"></div>
                    Live Modern
                </div>
            </nav>
        </div>

  );
}
export default MenuLateral;
