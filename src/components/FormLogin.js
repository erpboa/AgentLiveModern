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
          history.push("/LeadCommandCenter");
        } else {
          history.push("/");
        }
    }
  return (
    <div>
    {userContext !== null && <Redirect to="/LeadCommandCenter" />}
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card" id="ColoresPaneles">
            <div className="card-header">
              <center><h1>LIVE MODERN</h1></center>
            </div>
            <div className="card-body" id="CardLogin">
              <form onSubmit={handleEnviar} className="was-validated" validate>
                <div className="form-group">
                    <label className="h4 form-control-label" id="Letras">Cuenta <strong className="text-danger" title="This is required">*</strong></label>
                  <input type="text" className="form-control" value={cuenta} onChange={handleUser} placeholder="Cuenta" required/>
                  <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <div className="form-group">
                  <label className="h4 form-control-label" id="Letras">Password <strong className="text-danger" title="This is required">*</strong></label>
                  <input type="password" className="form-control" value={password} onChange={handlePassword} placeholder="Password" required/>
                  <div className="invalid-feedback">Please fill out this field.</div>
                </div>
                <center><button type="submit" className="btn btn-success">Submit</button></center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormLogin;
