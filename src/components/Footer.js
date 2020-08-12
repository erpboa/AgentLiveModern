import React from 'react';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';

const Footer = (props) => {
  return (
    <footer className="py-4 mt-auto PiePagina" id="ColoresPanelesFooter">
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
                <div id="Letras">Copyright &copy; Your Website 2020</div>
                <div>
                    <a id="Letras" href="http://localhost:3000/">Privacy Policy</a>
                    &middot;
                    <a id="Letras" href="http://localhost:3000/">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
export default Footer;
