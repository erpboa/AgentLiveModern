import React, {useContext} from 'react';
import './style/Style.css';
import Robot404 from '../../image/Robot404.png';
import {useHistory} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {Redirect} from "react-router-dom";

const NotFound = () => {

  const {userContext} = useContext(UserContext);

  let history = useHistory();
  const redireccion = async (e) => {
    history.push("/LeadCommandCenter");
  }
  if (userContext != null) {
    return(
      <div id="contenidoPrincipal">
        <div id="contenido">
          <center><h1 id="titulo2">PAGE NOT FOUND</h1></center>
          <center><h1 id="titulo">404</h1></center>
          <center><img id="Imagen" src={Robot404} width="150" alt="Robot 404"/></center>
          <br/>
          <center><button id="botonNotFound" type="button" onClick={redireccion} className="btn btn-primary">Home</button></center>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        {<Redirect to="/NotFound" />}
      </div>
    )
  }
}

export default NotFound;
