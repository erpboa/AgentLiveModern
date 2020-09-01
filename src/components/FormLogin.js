import React, {useState,useContext} from 'react';
import './styles/formLogin.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';
import PxpClient from 'pxp-client';
import {UserContext} from "../contexts/UserContext";
import {Redirect,useHistory} from "react-router-dom";
import {CambiarEstados} from "../contexts/CambiarEstados";

/*importamos las librerias de PNotify*/
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import * as PNotifyDesktop from '@pnotify/desktop';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
import * as PNotifyAnimate from '@pnotify/animate';
defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/



const FormLogin = () => {

  const {userContext} = useContext(UserContext);
  const {cambiarEstados, setCambiarEstados} = useContext(CambiarEstados);

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
       var login = PxpClient.login(cuenta, password);
       login.then((resp) => {
        if (resp!=undefined) {
          if (resp.ROOT!=undefined) {
            if (resp.ROOT.error === true) {
              const myNotice = alert({
                                      text: "Incorrect data please verify your information.",
                                      type: 'error',
                                      textTrusted: true,
                                      closerHover: true,
                                      modules: new Map([
                                        ...defaultModules,
                                      ])
                                    });
            }
          }else {
            setCambiarEstados(true);
          }

        } else {
          const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        }
      })
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
              <form onSubmit={handleEnviar} className="was-validated" validate="true">
                <div className="form-group">
                    <label className="h4 form-control-label" id="Letras">User <strong className="text-danger" title="This is required">*</strong></label>
                  <input type="text" className="form-control" value={cuenta} onChange={handleUser} placeholder="User" required/>
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
