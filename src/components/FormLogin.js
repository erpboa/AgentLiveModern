import React, {useState,useContext} from 'react';
import './styles/formLogin.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import PxpClient from 'pxp-client';
import {UserContext} from "../contexts/UserContext";
import {Redirect,useHistory} from "react-router-dom";

const FormLogin = () => {
  const {userContext} = useContext(UserContext)

  const [cuenta, setCuenta] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  const handleUser = e => {
        setCuenta(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleEnviar = e => {
        e.preventDefault();      
        PxpClient.login(cuenta, password);
        if (userContext != null) {
          history.push("/Dashboard");
        } else {
          history.push("/");
        }
    }
  return (
    <div>
    {userContext !== null && <Redirect to="/Dashboard" />}
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <center><h1>LIVE MOODERN</h1></center>
            </div>
            <div className="card-body">
              <form onSubmit={handleEnviar}>
                <div className="input-group form-group">
                  <i className="fa fa-user icon fa-2x"></i>
                  <input type="text" className="input-field" value={cuenta} onChange={handleUser} placeholder="Cuenta"/>
                </div>
                <div className="input-group form-group">
                  <i className="fa fa-key icon fa-2x"></i>
                  <input type="password" className="input-field" value={password} onChange={handlePassword} placeholder="Contraseña" />
                </div>
                <div className="form-group">
                  <center><button id="login-boton" type="submit" className="btn btn-success">Login</button></center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormLogin;
