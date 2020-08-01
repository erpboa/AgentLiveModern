import React, {useContext} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import {UserContext} from "../../contexts/UserContext";

const ContenidoDashboard = (props) => {
  const {userContext} = useContext(UserContext);  
  return (
    <div id="layoutSidenav_content">
        <main>
            <div className="container-fluid">
                <h1 className="mt-4">Aqui poner el contenido Dashboard</h1>
            </div>
        </main>
        <Footer/>
    </div>
  );
}
export default ContenidoDashboard;
