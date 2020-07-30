import React from 'react';
import {NavLink} from 'react-router-dom';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';

const MenuLateral = () => {
  return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Menu</div>
                        <NavLink className="nav-link" to="/Dashboard"><div><i className="fa fa-tachometer"></i> Dashboard</div></NavLink>
                        <NavLink className="nav-link" to="/Calendar"><div><i className="fa fa-calendar"></i> Calendar</div></NavLink>
                        <NavLink className="nav-link" to="/Oportunities"><div><i className="fa fa-handshake-o"></i> Oportunities</div></NavLink>
                        <NavLink className="nav-link" to="/GreatSheet"><div><i className="fa fa-file-o"></i> Great Sheet</div></NavLink>
                        <NavLink className="nav-link" to="/FeaturedListings"><div><i className="fa fa-newspaper-o"></i> Featured Listings</div></NavLink>
                        <NavLink className="nav-link" to="/Import"><div><i className="fa fa-exchange"></i> Import</div></NavLink>
                        <NavLink className="nav-link" to="/Marketing"><div><i className="fa fa-bullhorn"></i> Marketing</div></NavLink>
                        <NavLink className="nav-link" to="/Agents"><div><i className="fa fa-users"></i> Agents</div></NavLink>
                        <NavLink className="nav-link" to="/Reports"><div><i className="fa fa-line-chart"></i> Reports</div></NavLink>
                        <NavLink className="nav-link" to="/Settings"><div><i className="fa fa-cog"></i> Settings</div></NavLink>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small"></div>
                    Live Moodern
                </div>
            </nav>
        </div>

  );
}
export default MenuLateral;
