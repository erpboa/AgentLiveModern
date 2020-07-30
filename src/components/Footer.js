import React from 'react';
import './styles/formLogin.css';
import './styles/stylesMenu.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';

const Footer = (props) => {
  return (
    <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Your Website 2020</div>
                <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
export default Footer;
